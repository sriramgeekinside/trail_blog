var request = require('request');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
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
exports.store = function (req, res) {
    var user = req.body;
    console.log(user);
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            var sql = "INSERT INTO users (name, email,password) VALUES ('"+user.username+"','"+user.email+"', '"+hash+"')";
            req.getConnection(function(error, conn) {    
            conn.query(sql, function (err, result) {
                if (err) throw err;
                    resolve(result.length > 0);    
                });
            });
        });
    });
};