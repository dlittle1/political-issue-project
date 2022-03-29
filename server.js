const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');

app.use(express.json());
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/rtv', () => {
  console.log('connected to DB');
});

app.use('/auth', require('./routes/authRouter.js'));
app.use(
  '/api',
  expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] })
);
app.use('/api/issues', require('./routes/issueRouter.js'));

app.use((err, req, res, next) => {
  return res.json({ errorMessage: err.message });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
