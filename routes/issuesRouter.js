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

//Get one issue
issueRouter.get('/:issueId', (req, res, next) => {
  Issue.findById({ _id: req.params.issueId }, (err, issue) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(issue);
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

//Delete a Issue
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

//Get all comments and comment authors for this issue
issueRouter.get('/:issueId/comments', (req, res, next) => {
  Issue.findOne({ _id: req.params.issueId })
    .populate([
      {
        path: 'comments',
        populate: { path: 'user' },
      },
    ])
    .exec((err, comments) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(comments);
    });
  // returns
  // {
  // "_id": "1234567",
  // "comments": [ { "_id": "891011", "body": "hello world", "user": "456789" }]
  //  }
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

//Like issue
issueRouter.put('/:issueId/like', (req, res, next) => {
  Issue.findByIdAndUpdate(
    { _id: req.params.issueId },
    { $push: { likes: req.user._id } },
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(updatedIssue);
    }
  );
});
module.exports = issueRouter;
