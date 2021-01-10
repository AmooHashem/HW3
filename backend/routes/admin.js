"use strict";
const express = require('express');
const admin = express.Router();
const Post = Parse.Object.extend("Post");
const authenticateToken = require("../middleware/tokenAuthMiddleware") ;

admin.use(authenticateToken.authenticateToken);

admin.post('/post/crud', async function (req, res) {
  console.log("Handling posting a post!");
  const body = req.body || { title: 'post title', content: 'post content'};
  Parse.User.enableUnsafeCurrentUser();
  
  const user = res.locals.user;
  const post = new Post();
  const postACL = new Parse.ACL();
  postACL.setPublicReadAccess(true);

  console.log(body);

  post.setACL(postACL);
  post.set("title", body.title);
  post.set("content", body.content);
  post.set("createdBy", user);
  post.save().then(function (post) {
    console.log("22222");
    res.send(post);
  }, function (error) {
    console.log("33333");
    res.status(error.code).send(error.message);
    return;
  });

  // }, function (error) {
  //   console.log("444444");
  //   res.status(error.code).send(error.message);
  //   return;
  // });

});


module.exports = admin;