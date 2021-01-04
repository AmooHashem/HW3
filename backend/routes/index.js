
var express = require('express');
var index = express.Router();

index.use('/api/admin', require('./admin'))
index.use('/api/', require('./other'))

index.get('/', function (req, res) {
  res.send('Hello from auth root route.');
});

index.get('/users', function (req, res) {
  res.send('List of auth users.');
});

module.exports = index;