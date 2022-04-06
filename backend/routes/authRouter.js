const express = require('express');
const authRouter = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bigheadsGenerator = require('../utils/bigheads');
const { getRandomOptions } = bigheadsGenerator;

// Signup
authRouter.post('/signup', (req, res, next) => {
  User.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (user) {
      res.status(403);
      return next(new Error('User already exists with that email address'));
    }
    req.body.avatar = { ...getRandomOptions() };

    const newUser = new User(req.body);
    newUser.save((err, savedUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      const token = jwt.sign(savedUser.toObject(), process.env.SECRET);
      return res.status(201).send({ token, user: savedUser });
    });
  });
});

authRouter.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!user) {
      res.status(403);
      return next(new Error('Username or Password are incorrect'));
    }
    if (req.body.password !== user.password) {
      res.status(403);
      return next(new Error('Username or Password are incorrect'));
    }
    const token = jwt.sign(user.toObject(), process.env.SECRET);
    return res.status(200).send({ token, user });
  });
});

// authRouter.put('/update', (req, res, next) => {
//   req.body.avatar = { ...getRandomOptions() };
//   User.updateOne(
//     { email: req.body.email.toLowerCase() },
//     req.body,
//     { new: true },
//     (err, updatedUser) => {
//       if (err) {
//         res.status(500);
//         return next(err);
//       }
//       return res.status(200).send(updatedUser);
//     }
//   );
// });

module.exports = authRouter;
