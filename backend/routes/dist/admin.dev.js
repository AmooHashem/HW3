"use strict";

var express = require('express');

var admin = express.Router(); // todo: change get --> post 

admin.get('/post/crud', function _callee2(req, res) {
  var body;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          body = req.body || {
            title: 'post title',
            content: 'post content',
            token: 'r:21d6c57187e630933941b4dd19777631'
          };
          Parse.User.enableUnsafeCurrentUser();
          Parse.User.become(body.token).then(function _callee(user) {
            var Post, post, postACL;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    Post = Parse.Object.extend("Post");
                    post = new Post();
                    postACL = new Parse.ACL();
                    postACL.setPublicReadAccess(true);
                    post.setACL(postACL);
                    post.set("title", body.title);
                    post.set("content", body.content);
                    post.set("createdBy", user);
                    post.save().then(function (post) {
                      res.send(post);
                    }, function (error) {
                      res.status(error.code).send(error.message);
                    });

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }, function (error) {
            res.status(error.code).send(error.message);
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = admin;