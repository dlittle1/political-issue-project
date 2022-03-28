const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');

app.use(express.json());
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/rvt', () => {
  console.log('connected to DB');
});

console.log(process.env.PORT);

app.use('/auth', require('./routes/authRouter.js'));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
