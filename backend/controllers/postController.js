const Post = require('../models/post');
const Tags = require('../models/tags');
const Comment = require('../models/comment');

exports.getAllPosts = (req, res, next) => {
  let queryObject = { ...req.query };
  let queryString = JSON.stringify(queryObject);

  // REGEX queries localhost:9000/api/posts?tags[regex]=funky|feeling|politics
  // title[regex]=(?i)(?=.*post)(?=.*dylan)&createdBy=62462d12767bdc1d76ee6d2e

  queryString = queryString.replace(/\b(regex|in)\b/g, (match) => `$${match}`);
  let query = Post.find(JSON.parse(queryString));

  if (req.query.sort) {
    let sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-price');
  }

  query
    .populate([
      {
        path: 'comments',
        options: { sort: { createdAt: 1 } },
        populate: { path: 'user' },
      },
    ])
    .populate([{ path: 'createdBy' }])
    .exec((err, populatedPost) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(populatedPost);
    });
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.postId })
    .populate([
      {
        path: 'comments',
        options: { sort: { createdAt: 1 } },
        populate: { path: 'user' },
      },
    ])
    .populate([{ path: 'createdBy' }])
    .exec((err, populatedPost) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(populatedPost);
    });
};

exports.createPost = (req, res, next) => {
  req.body.createdBy = req.user._id;
  const newPost = new Post(req.body);
  newPost.save((err, savedPost) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    Tags.updateOne({}, { $addToSet: { tags: savedPost.tags } }, (err, tags) => {
      if (err) {
        res.status(500);
        next(err);
      }
    });
    return res.status(201).send(savedPost);
  });
};

exports.updatePost = (req, res, next) => {
  Post.findOneAndUpdate(
    { $and: [{ _id: req.params.postId }, { createdBy: req.user._id }] },
    req.body,
    { new: true },
    (err, updatedPost) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (!updatedPost) {
        res.status(404);
        return next(new Error('User has no posts with this ID'));
      }
      return res.status(201).send(updatedPost);
    }
  );
};

exports.deletePost = (req, res, next) => {
  Post.findOneAndDelete(
    { _id: req.params.postId, createdBy: req.user._id },
    (err, deletedPost) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (!deletedPost) {
        res.status(404);
        return next(new Error('User has no posts with this ID'));
      }
      return res.status(200).send(`Successfully deleted ${deletedPost.title}`);
    }
  );
};

exports.likePost = (req, res, next) => {
  Post.updateOne(
    { _id: req.params.postId },
    { $addToSet: { likes: req.user._id }, $inc: { upvotes: 1 } },
    { new: true },
    (err, updateResult) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (updateResult.modifiedCount === 0) {
        return res.status(400).send('Cannot like a post more than once');
      }
      return res.status(200).send(updateResult);
    }
  );
};

exports.deleteLike = (req, res, next) => {
  Post.updateOne(
    { _id: req.params.postId },
    { $pull: { likes: req.user._id }, $inc: { upvotes: -1 } },
    { new: true },
    (err, updateResult) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(updateResult);
    }
  );
};

exports.getLikePost = (req, res, next) => {
  Post.findOne(
    { $and: [{ _id: req.params.postId }, { likes: { $in: req.user._id } }] },
    (err, post) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(post);
    }
  );
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
