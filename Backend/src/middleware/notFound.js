const db = require('../config/db')
const crypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const checkStatus = (req, res, next) => {
  let message = '';
  if (res.statusCode === 400) {
    message = 'Bad Request';
  } else if (res.statusCode === 404) {
    message = 'Not Found';
  } else {
    message = 'Internal Server Error';
  }
  res.json({ message: message });
};

module.exports = checkStatus;
