const express = require('express');
const authRouter = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bigheadsGenerator = require('../utils/bigheads');
const { getRandomOptions } = bigheadsGenerator;
const bcrypt = require('bcrypt');
const guestAvatar = require('../utils/guestAvatar');
const { getGuestAvatar } = guestAvatar;

// Signup
authRouter.post('/signup', async (req, res, next) => {
  const { username, email, password: plainTextPassword } = req.body;
  const saltRounds = 10;

  const password = await bcrypt.hash(plainTextPassword, saltRounds);

  const avatar = { ...getRandomOptions() };

  const user = { username, email, password, avatar };

  try {
    const foundUser = await User.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (foundUser) {
      res.status(403);
      return next(new Error('User already exists with that email address'));
    }

    const newUser = await User.create(user);

    token = jwt.sign(
      {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        type: 'user',
      },
      process.env.SECRET,
      { expiresIn: '24h' }
    );

    const newUserObj = newUser.toObject();
    delete newUserObj.password;

    return res.status(201).send({ token, user: newUserObj });
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user) {
      res.status(403);
      return next(new Error('Username or Password are incorrect'));
    }
    if (await bcrypt.compareSync(req.body.password, user.password)) {
      token = jwt.sign(
        {
          _id: user._id,
          username: user.username,
          email: user.email,
          type: 'user',
        },
        process.env.SECRET,
        { expiresIn: '24h' }
      );
      let userObj = user.toObject();
      delete userObj.password;

      return res.status(200).send({ token, userObj });
    }
    return { status: 'error', error: 'invalid password' };
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

// authRouter.put('/updatePassword', async (req, res, next) => {
//   const { username, email, newPassword: newPlainTextPassword } = req.body;
//   const saltRounds = 10;

//   try {
//     const newPassword = await bcrypt.hash(newPlainTextPassword, saltRounds);

//     const updatedPassword = await User.findOneAndUpdate(
//       { email: email },
//       { password: newPassword },
//       { new: true }
//     );

//     return res.status(200).send(updatedPassword);
//   } catch (err) {
//     res.status(500);
//     return next(err);
//   }
// });

// authRouter.post('/guest', async (req, res, next) => {
//   const { username, password: plainTextPassword, email } = req.body;
//   const salt = bcrypt.genSaltSync(10);
//   const password = await bcrypt.hash(plainTextPassword, salt);
//   const avatar = getGuestAvatar();

//   try {
//     const guestUser = await User.create({
//       username,
//       email,
//       password,
//       avatar,
//     });
//     const token = jwt.sign(
//       {
//         _id: guestUser._id,
//         username: guestUser.username,
//         email: guestUser.email,
//         type: 'user',
//       },
//       process.env.SECRET,
//       {
//         expiresIn: '24h',
//       }
//     );
//     const guestUserObj = guestUser.toObject();
//     delete guestUserObj.password;
//     return res.status(201).json({ token, user: guestUserObj });
//   } catch (err) {
//     return next(err);
//   }
// });

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
