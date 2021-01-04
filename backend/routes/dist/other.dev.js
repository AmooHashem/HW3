"use strict";

var express = require('express');

var other = express.Router();
other.get('/signup', function _callee(req, res) {
  var body, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          body = req.body || {
            email: 'amoo.hashem.mehraban@gmail.com',
            password: "1234"
          };
          user = new Parse.User();
          user.set("email", body.email);
          user.set("username", body.email);
          user.set("password", body.password);
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(user.signUp());

        case 8:
          res.send(user);
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](5);
          res.status(_context.t0.code).send(_context.t0.message);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 11]]);
});
other.get('/signin', function _callee2(req, res) {
  var body, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          body = req.body || {
            email: 'amoo.hashem.mehraban@gmail.com',
            password: "1234"
          };
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Parse.User.logIn(body.email, body.password));

        case 4:
          user = _context2.sent;
          res.send(user);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.status(_context2.t0.code).send(_context2.t0.message);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
other.get('/post', function (req, res) {
  res.send('List of other users.');
});
other.get('/', function (req, res) {
  res.send('List of other root.');
});
module.exports = other;