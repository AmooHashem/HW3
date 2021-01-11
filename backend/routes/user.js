
var express = require('express');
var user = express.Router();
const Middleware = require("../middleware/tokenAuthMiddleware") ;

user.get('/signup', (_, res) => {
  res.status(405).send("only `POST` method is valid");
})

user.post('/signup', async (req, res) => {
  const body = req.body 

  const email = body.email;
  const password = body.password;

  if (!email || !validateEmail(email)) {
    res.status(400).send("ایمیل فرستاده شده معتبر نمیباشد.");
    return;
  }
  if (!password || password == "") {
    res.status(400).send("پسورد رو بده مرد مومن!");
    return;
  }

  const user = new Parse.User();

  user.set("email", email);
  user.set("password", password);
   user.set("username", body.username);

  try {
    await user.signUp();
    res.status(200).send(user);
  } catch (error) {
    if (error.message == "Account already exists for this email address.") {
      res.status(409).send("این اکانت قبلا ساخته شده است!");
    }
    console.log(error.message + " : " + error.code);
    res.status(500).send( "خطای داخلی سرور:" + error.message);
  }
});




user.get('/signin', (_, res) => {
  res.status(405).send("only `POST` method is valid");
})

user.post('/signin', async function (req, res) {
  const body = req.body 

  const email = body.email;
  const password = body.password;

  if (!email || !validateEmail(email)) {
    res.status(400).send("ایمیل فرستاده شده معتبر نمیباشد.");
    return;
  }
  if (!password || password == "") {
    res.status(400).send("پسورد رو بده مرد مومن!");
    return;
  }



  try {
    const user = await Parse.User.logIn(email, password, {usePost: true});
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message + " : " + error.code);
    res.status(401).send("ایمیل یا رمز عبور شما نامعتبر است.");
  }
});


user.get('/signout', Middleware.authenticateToken, function (req, res) {
  const user = res.locals.user;
  Parse.User.enableUnsafeCurrentUser();

  Parse.User.become(user.authenticateToken).then(async (user) => {
    Parse.User.logOut().then(() => {
      res.status(200).send("You Signed out successfully");
    }, function (error) {
      res.status(error.code).send(error.message);
    });
  }, function (error) {
    res.status(error.code).send(error.message);
  });
});


user.get('/', function (req, res) {
  res.status(200).send('List of user root.');
});

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = user;