const express = require('express');
const issueRouter = express.Router();
const Issue = require('../models/issue');
const Comment = require('../models/comment');

//Get all issues
issueRouter.get('/', (req, res, next) => {
  Issue.find((err, issues) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(issues);
  });
});

//Get Issues by User
issueRouter.get('/user', (req, res, next) => {
  Issue.find({ createdBy: req.user._id }, (err, issues) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!issues) {
      res.status(404);
      return next(new Error('No issues found by this user'));
    }
    return res.status(200).send(issues);
  });
});

//Create Issue
issueRouter.post('/', (req, res, next) => {
  req.body.createdBy = req.user._id;
  const newIssue = new Issue(req.body);
  newIssue.save((err, savedIssue) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedIssue);
  });
});

//Update Issue
issueRouter.put('/:issueId', (req, res, next) => {
  Issue.findOneAndUpdate(
    { $and: [{ _id: req.params.issueId }, { createdBy: req.user._id }] },
    req.body,
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (!updatedIssue) {
        res.status(404);
        return next(new Error('User has no Issues with this ID'));
      }
      return res.status(201).send(updatedIssue);
    }
  );
});

issueRouter.delete('/:issueId', (req, res, next) => {
  Issue.findOneAndDelete(
    { _id: req.params.issueId, createdBy: req.user._id },
    (err, deletedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (!deletedIssue) {
        res.status(404);
        return next(new Error('User has no Issues with this ID'));
      }
      return res.status(200).send(`Successfully deleted ${deletedIssue.title}`);
    }
  );
});

// Issue Comments

//Get all comments for this issue
issueRouter.get('/:issueId/comments', (req, res, next) => {
  const ObjectId = require('mongoose').Types.ObjectId;
  Issue.aggregate(
    [
      { $match: { _id: ObjectId(req.params.issueId) } },
      {
        $lookup: {
          from: 'comments',
          localField: 'comments',
          foreignField: '_id',
          as: 'comment_list',
        },
      },
      { $project: { _id: 0, comment_list: 1 } },
    ],
    (err, issueComments) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(JSON.stringify(issueComments));
    }
  );
});

//Create comments for the issue
issueRouter.post('/:issueId/comments', (req, res, next) => {
  req.body.user = req.user._id;
  const newComment = new Comment(req.body);
  newComment.save((err, comment) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    Issue.findByIdAndUpdate(
      { _id: req.params.issueId },
      { $push: { comments: comment._id } },
      { new: true },
      (err, updatedIssue) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        return res.status(200).send(comment);
      }
    );
  });
});
module.exports = issueRouter;
