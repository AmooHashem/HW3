
var express = require('express');
var admin = express.Router();

// todo: change get --> post 
admin.get('/post/crud', async function (req, res) {
  const body = req.body || { title: 'post title', content: 'post content', token: 'r:21d6c57187e630933941b4dd19777631' };
  Parse.User.enableUnsafeCurrentUser();

  Parse.User.become(body.token).then(async (user) => {

    const Post = Parse.Object.extend("Post");
    const post = new Post();
    const postACL = new Parse.ACL();
    postACL.setPublicReadAccess(true);
    post.setACL(postACL);
    post.set("title", body.title);
    post.set("content", body.content);
    post.set("createdBy", user);
    post.save().then(function (post) {
      res.send(post);
    }, function (error) {
      res.status(error.code).send(error.message)
    });

  }, function (error) {
    res.status(error.code).send(error.message);
  });

});

module.exports = admin;