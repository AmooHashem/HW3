"use strict"
var express = require('express');
var post = express.Router();


post.get('/', function (req, res) {

  const Post = Parse.Object.extend("Post");
  (new Parse.Query(Post)).find()
    .then((posts) => {
      res.status(200).send(posts.map((post) => {
        return {
          id: post.get("id"),
          title: post.get("title"),
          content: post.get("content"),
          createdBy: {username: post.get("createdBy").get("username"), email: post.get("createdBy").get("email")},
          createdAt: post.createdAt
        }
      }));
      return;
    }, (error) => {
      console.log(error.message);
      res.status(500).send(error.message);
      return;
    });

});

module.exports = post;