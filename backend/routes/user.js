
var express = require('express');
var user = express.Router();

user.post('/signup', async (req, res) => {
  const body = req.body //|| { email: 'amoo1.hashem.mehraban@gmail.com', password: "1234" };

  const user = new Parse.User();

  user.set("email", body.email);
  user.set("username", body.email);
  user.set("password", body.password);

  try {
    await user.signUp();
    res.status(200).send(user);
  } catch (error) {
    res.status(error.code).send(error.message);
  }
});


user.post('/signin', async function (req, res) {
  const body = req.body || { email: 'amoo2.hashem.mehraban@gmail.com', password: "1234" };

  try {
    const user = await Parse.User.logIn(body.email, body.password, {usePost: true});
    res.status(200).send(user);
  } catch (error) {
    res.status(error.code).send(error.message);
  }
});

/*
user.get('/signout', function (req, res) {
  const body = req.body || { token: 'r:21d6c57187e630933941b4dd19777631' };
  Parse.User.enableUnsafeCurrentUser();

  Parse.User.become(body.token).then(async (user) => {
    Parse.User.logOut().then(() => {
      res.status(200).send("You Signed out successfully");
    }, function (error) {
      res.status(error.code).send(error.message);
    });
  }, function (error) {
    res.status(error.code).send(error.message);
  });
});
*/

user.get('/', function (req, res) {
  res.status(200).send('List of user root.');
});

module.exports = user;