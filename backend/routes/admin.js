
var express = require('express');
var admin = express.Router();

admin.get('/', function (req, res) {
  res.send('Hello from admin root route.');
});

admin.get('/users', function (req, res) {
  res.send('List of admin users.');
});

module.exports = admin;