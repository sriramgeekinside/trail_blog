var express = require('express');
var request = require('request');
var session = require('express-session');
var app = express()
app.use(session({secret: "Shh, its a secret!",resave: true,saveUninitialized: true}));
function authChecker(req,res,next) {
    res.locals.session = null;
    if (req.session.user) {
        res.locals.user = req.session.user;
        next();
    } else {
       res.redirect("/admin/login");
    }
}
module.exports = {
  authChecker
}
