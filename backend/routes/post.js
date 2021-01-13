"use strict"
var express = require('express');
var post = express.Router();


post.get('/', async (_, res) => {

  const Post = Parse.Object.extend("Post");
  (new Parse.Query(Post)).find()
    .then((posts) => {
      res.status(200).json({
        "posts": posts.map((post) => {
          return {
            id: post.get("id"),
            title: post.get("title"),
            content: post.get("content"),
            createdBy: post.get("createdBy").username,
            createdAt: post.createdAt
          }
        })
      });
      return;
    }, (error) => {
      console.log(error.message);
      res.status(500).send(error.message);
      return;
    });

});

module.exports = post;