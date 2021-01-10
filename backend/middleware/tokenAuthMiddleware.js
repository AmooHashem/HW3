"use strict";

const authenticateToken = (req, res, next) => {

    const token = req.headers['authorization'];
    if (token === undefined) {
        console.log("Authentication Failed");
        res.status(401).send("توکن دسترسی یافت نشد.");
    }

    Parse.User.enableUnsafeCurrentUser();
    const user = Parse.User.become(token, null).then( (user) => {
        res.locals.user = user;
        console.log(req.body);

        next();
    }, (_) => {
        res.status(401).send("توکن دسترسی نامعتبر است.");
    });
}

module.exports = {authenticateToken};