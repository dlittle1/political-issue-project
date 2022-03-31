const express = require('express');
const postRouter = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');

//Get all posts
postRouter.get('/', (req, res, next) => {
  Post.find((err, posts) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(posts);
  });
});

//Get one post
postRouter.get('/:postId', (req, res, next) => {
  Post.findById({ _id: req.params.postId }, (err, post) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(post);
  });
});

//Get posts by User
postRouter.get('/user', (req, res, next) => {
  Post.find({ createdBy: req.user._id }, (err, posts) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!posts) {
      res.status(404);
      return next(new Error('No posts found by this user'));
    }
    return res.status(200).send(posts);
  });
});

//Create post
postRouter.post('/', (req, res, next) => {
  req.body.createdBy = req.user._id;
  const newPost = new Post(req.body);
  newPost.save((err, savedPost) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedPost);
  });
});

//Update post
postRouter.put('/:postId', (req, res, next) => {
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
});

//Delete a post
postRouter.delete('/:postId', (req, res, next) => {
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
});

// post Comments

//Get all comments and comment authors for this post
postRouter.get('/:postId/comments', (req, res, next) => {
  Post.findOne({ _id: req.params.postId })
    .populate([
      {
        path: 'comments',
        options: { sort: { createdAt: 1 } },
        populate: { path: 'user' },
      },
    ])
    .exec((err, populatedPost) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(populatedPost);
    });
});

//Create comments for the post
postRouter.post('/:postId/comments', (req, res, next) => {
  req.body.user = req.user._id;
  const newComment = new Comment(req.body);
  newComment.save((err, comment) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    Post.findByIdAndUpdate(
      { _id: req.params.postId },
      { $push: { comments: comment._id } },
      { new: true },
      (err, updatedPost) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        return res.status(200).send(comment);
      }
    );
  });
});

//Like post
postRouter.put('/:postId/like', (req, res, next) => {
  Post.updateOne(
    { _id: req.params.postId },
    { $addToSet: { likes: req.user._id } },
    { new: true },
    (err, updateResult) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (updateResult.modifiedCount === 0) {
        return res.status(500).send('Cannot like a post more than once');
      }
      return res.status(200).send(updateResult);
    }
  );
});
module.exports = postRouter;
