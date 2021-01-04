
var express = require('express');
var user = express.Router();

user.get('/signup', async function (req, res) {
  const body = req.body || { email: 'amoo.hashem.mehraban@gmail.com', password: "1234" };

  const user = new Parse.User();

  user.set("email", body.email);
  user.set("username", body.email);
  user.set("password", body.password);

  try {
    await user.signUp();
    res.send(user);
  } catch (error) {
    res.status(error.code).send(error.message);
  }
});

user.get('/signin', async function (req, res) {
  const body = req.body || { email: 'amoo.hashem.mehraban@gmail.com', password: "1234" };

  try {
    const user = await Parse.User.logIn(body.email, body.password);
    res.send(user);
  } catch (error) {
    res.status(error.code).send(error.message);
  }
});

user.get('/post', function (req, res) {
  res.send('List of user users.');
});

user.get('/', function (req, res) {
  res.send('List of user root.');
});

module.exports = user;