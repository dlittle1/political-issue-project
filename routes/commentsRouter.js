const express = require('express');
const commentRouter = express.Router();
const Comment = require('../models/comment');

commentRouter.get('/', (req, res, next) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(comments);
  });
});

commentRouter.get('/:commentId', (req, res, next) => {
  Comment.findOne({ _id: req.params.commentId }, (err, comment) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(comment);
  });
});

commentRouter.put('/:commentId', (req, res, next) => {
  Comment.findByIdAndUpdate(
    { _id: req.params.commentId },
    req.body,
    { new: true },
    (err, updatedComment) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(updatedComment);
    }
  );
});

commentRouter.delete('/:commentId', (req, res, next) => {
  Comment.findByIdAndDelete(
    { _id: req.params.commentId },
    (err, deletedComment) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(`deleted the comment`);
    }
  );
});

module.exports = commentRouter;
