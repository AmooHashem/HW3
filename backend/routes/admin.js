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

  post.setACL(postACL);
  post.set("title", body.title);
  post.set("content", body.content);
  post.set("createdBy", user);
  post.save().then((postResp) => {
    const post = postResp.toJSON();
    res.status(200).send({"title": post.title, 
    "content": post.content,
    "createdBy": {"username": post.createdBy.username, "email": post.createdBy.email}                  
  });

  }, function (error) {
    res.status(error.code).send(error.message);
    return;
  });

});


module.exports = admin;