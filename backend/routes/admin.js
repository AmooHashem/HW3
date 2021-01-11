"use strict";
const express = require('express');
const admin = express.Router();
const Post = Parse.Object.extend("Post");
const middleware = require("../middleware/tokenAuthMiddleware") ;
const user = require('./user');

admin.use(middleware.authenticateToken);

admin.post('/post/crud', middleware.checkForTitleAndContent,  async (req, res) => {
  console.log("Handling posting a post!");
  const body = req.body;
  Parse.User.enableUnsafeCurrentUser();
  
  const user = res.locals.user;
  const post = new Post();
  const postACL = new Parse.ACL();
  postACL.setPublicReadAccess(true);
  postACL.setWriteAccess(user, true);
  postACL.setReadAccess(user, true);

  post.setACL(postACL);
  post.set("title", body.title);
  post.set("content", body.content);
  post.set("createdBy", user);
  post.save().then((post) => {
    res.status(200).send({"title": post.get("title"), 
    "content": post.get("content"),
    "createdBy": {"username": post.get("createdBy").get("username"), "email": post.get("createdBy").get("email")},
    "id": post.id,
    });

  }, function (error) {
    res.status(error.code).send(error.message);
    return;
  });

});



admin.put('/post/crud/:id', middleware.checkForTitleAndContent, async (req, res) => {
  console.log("Handling updating a post!");
  
  const id = req.params.id;
  if (!id) {
    res.status(400).send("خطا در url ارسالی");
    return;
  }
  const body = req.body;
  const user = res.locals.user;
  Parse.User.enableUnsafeCurrentUser();

  const query = new Parse.Query(Post);
  query.get(id).then((post) => {

    if(!post.getACL().getWriteAccess(user)) {
      res.status(401).send("شما اجازه‌ی تغییر این پست را ندارید.");
      return;
    }    

    post.set("title", body.title);
    post.set("content", body.content);

    post.save().then((postResp) => {
      const post = postResp.toJSON();
      res.status(200).send({"title": post.title, 
      "content": post.content,
      "createdBy": {"username": post.createdBy.username, "email": post.createdBy.email},
      "id": post.objectId,
      });
  
    }, function (_) {
      res.status(401).send("شما اجازه‌ی تغییر این پست را ندارید.");
      return;
    });

  }, (_) => {
    res.status(400).send("پست درخواستی شما یافت نشد.");
    return;
  });

})



module.exports = admin;