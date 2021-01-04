
var express = require('express');
var other = express.Router();

other.get('/', function (req, res) {
  res.send('Hello from other root route.');
});

other.get('/users', function (req, res) {
  res.send('List of other users.');
});

module.exports = other;