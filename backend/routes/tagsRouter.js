const express = require('express');
const tagsRouter = express.Router();
const Tags = require('../models/tags');

tagsRouter.get('/', (req, res, next) => {
  Tags.find({}, (err, tags) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(tags);
  });
});

module.exports = tagsRouter;
