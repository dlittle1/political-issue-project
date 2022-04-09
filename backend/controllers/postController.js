const Post = require('../models/post');
const Tags = require('../models/tags');
const Comment = require('../models/comment');

exports.getAllPosts = async (req, res, next) => {
  let queryObject = { ...req.query };
  let queryString = JSON.stringify(queryObject);

  console.log(req.query.featureToggle);
  // REGEX queries localhost:9000/api/posts?tags[regex]=funky|feeling|politics
  // title[regex]=(?i)(?=.*post)(?=.*dylan)&createdBy=62462d12767bdc1d76ee6d2e

  queryString = queryString.replace(/\b(regex|in)\b/g, (match) => `$${match}`);

  try {
    let query = Post.find(JSON.parse(queryString));

    if (req.query.sort) {
      let sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-price');
    }

    const posts = await query
      .populate([
        {
          path: 'comments',
          options: { sort: { createdAt: 1 } },
          populate: { path: 'user' },
        },
      ])
      .populate([{ path: 'createdBy' }]);

    res.status(200).send(posts);
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId })
      .populate([
        {
          path: 'comments',
          options: { sort: { createdAt: 1 } },
          populate: { path: 'user' },
        },
      ])
      .populate([{ path: 'createdBy' }]);

    res.status(200).send(post);
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

exports.createPost = async (req, res, next) => {
  req.body.createdBy = req.user._id;
  try {
    const newPost = new Post(req.body);

    const savedPost = await newPost.save();
    Tags.updateOne({}, { $addToSet: { tags: savedPost.tags } });
    return res.status(200).send(savedPost);
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { $and: [{ _id: req.params.postId }, { createdBy: req.user._id }] },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      res.status(404);
      return next(new Error('User has no posts with this ID'));
    }
    return res.status(201).send(updatedPost);
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.postId,
      createdBy: req.user._id,
    });

    if (!deletedPost) {
      res.status(404);
      return next(new Error('User has no posts with this ID'));
    }
    return res.status(200).send(`Successfully deleted ${deletedPost.title}`);
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const updateResult = await Post.updateOne(
      { _id: req.params.postId },
      { $addToSet: { likes: req.user._id }, $inc: { upvotes: 1 } },
      { new: true }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(400).send('Cannot like a post more than once');
    }
    return res.status(200).send(updateResult);
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

exports.deleteLike = async (req, res, next) => {
  try {
    const updateResult = await Post.updateOne(
      { _id: req.params.postId },
      { $pull: { likes: req.user._id }, $inc: { upvotes: -1 } },
      { new: true }
    );
    return res.status(200).send(updateResult);
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

exports.createCommentOnPost = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    let newComment = await Comment.create(req.body);

    Post.updateOne(
      { _id: req.params.postId },
      { $addToSet: { comments: newComment._id } },
      (err, post) => {
        if (err) {
          res.status(500);
          return next(err);
        }
      }
    );

    newComment = await newComment.populate([{ path: 'user' }]);
    return res.status(200).send(newComment);
  } catch (err) {
    res.status(500);
    return next(err);
  }
};
