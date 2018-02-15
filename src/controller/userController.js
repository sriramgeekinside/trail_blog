var request = require('request');
var app_name = "Red leaf | "
exports.login = function (req, res) { 
    // render to views/login.ejs template file
    res.render('login', {
        title: app_name + 'Login'
    })
};
exports.authenticate = function (req, res) {
    var user = req.body;
    if (user.username === 'sriram' && user.password === '123456') {
        req.session.user_id = 1;
        res.redirect('/');
    } else {
        res.redirect('/admin/login');
    }
};