
var express = require('express');
var user = express.Router();
const Middleware = require("../middleware/tokenAuthMiddleware");

user.get('/signup', (_, res) => {
  res.status(405).json({ message: "only `POST` method is valid" });
})

user.post('/signup', async (req, res) => {
  const body = req.body

  const email = body.email;
  const password = body.password;

  if (!email || !validateEmail(email)) {
    res.status(400).json({ message: "ایمیل فرستاده شده معتبر نمی‌باشد." });
    return;
  }
  if (!password || password == "") {
    res.status(400).json({ message: "پسورد رو بده مرد مومن!" });
    return;
  }

  const user = new Parse.User();

  user.set("email", email);
  user.set("password", password);
  user.set("username", email);

  try {
    await user.signUp();
    res.status(200).json({ user });
  } catch (error) {
    if (error.message == "Account already exists for this email address.") {
      res.status(409).json({ message: "این اکانت قبلا ساخته شده است!" });
    }
    console.log(error.message + " : " + error.code);
    res.status(500).json({ message: "خطای داخلی سرور:" + error.message });
  }
});




user.get('/signin', (_, res) => {
  res.status(405).json({ message: "only `POST` method is valid" });
})

user.post('/signin', async function (req, res) {
  const body = req.body

  const email = body.email;
  const password = body.password;

  if (!email || !validateEmail(email)) {
    res.status(400).json({ message: "ایمیل فرستاده شده معتبر نمی‌باشد." });
    return;
  }
  if (!password || password == "") {
    res.status(400).json({ message: "پسورد رو بده مرد مومن!" });
    return;
  }

  try {
    const user = await Parse.User.logIn(email, password, { usePost: true });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error.message + " : " + error.code);
    res.status(401).json({ message: "ایمیل یا رمز عبور شما نامعتبر است." });
  }
});


user.get('/signout', Middleware.authenticateToken, function (req, res) {
  const user = res.locals.user;
  Parse.User.enableUnsafeCurrentUser();

  Parse.User.become(user.authenticateToken).then(async (user) => {
    Parse.User.logOut().then(() => {
      res.status(200).json({ message: "You Signed out successfully" });
    }, function (error) {
      res.status(error.code).json({ message: error.message });
    });
  }, function (error) {
    res.status(error.code).json({ message: error.message });
  });
});


user.get('/', function (req, res) {
  res.status(200).json({ message: 'List of user root.' });
});

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = user;