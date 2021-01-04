"use strict";

var express = require('express');

var user = express.Router(); // todo: change get --> post 

user.get('/signup', function _callee(req, res) {
  var body, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          body = req.body || {
            email: 'amoo1.hashem.mehraban@gmail.com',
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
}); // todo: change get --> post 

user.get('/signin', function _callee2(req, res) {
  var body, _user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          body = req.body || {
            email: 'amoo2.hashem.mehraban@gmail.com',
            password: "1234"
          };
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Parse.User.logIn(body.email, body.password));

        case 4:
          _user = _context2.sent;
          res.send(_user);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.send(_context2.t0.message);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
user.get('/signout', function (req, res) {
  var body = req.body || {
    token: 'r:21d6c57187e630933941b4dd19777631'
  };
  Parse.User.enableUnsafeCurrentUser();
  Parse.User.become(body.token).then(function _callee3(user) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            Parse.User.logOut().then(function () {
              res.send("You Signed out successfully");
            }, function (error) {
              res.status(error.code).send(error.message);
            });

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  }, function (error) {
    res.status(error.code).send(error.message);
  });
});
user.get('/', function (req, res) {
  res.send('List of user root.');
});
module.exports = user;