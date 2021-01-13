"use strict";

const authenticateToken = (req, res, next) => {

    const token = req.headers['authorization'];
    if (token === undefined) {
        console.log("Authentication Failed");
        res.status(401).json({ message: "توکن دسترسی یافت نشد." });
        return;
    }

    Parse.User.enableUnsafeCurrentUser();
    Parse.User.become(token, null).then((user) => {
        res.locals.user = user;
        next();
        return;
    }, (_) => {
        res.status(401).json({ message: "توکن دسترسی نامعتبر است." });
        return;
    });
}

const checkForTitleAndContent = (req, res, next) => {
    if (!req.body.title || !req.body.content) {
        res.status(400).json({ message: "Request must contain Title and Content" });
        return;
    }
    next();
}

module.exports = { authenticateToken, checkForTitleAndContent };