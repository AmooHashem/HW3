"use strict";

var express = require('express');

var index = express.Router();
index.use('/api/admin', require('./admin'));
index.use('/api/', require('./user'));
index.get('/users', function (req, res) {
  res.send('List of auth users.');
});
index.get('/', function (req, res) {
  res.send('Hello from index root route.');
});
module.exports = index;