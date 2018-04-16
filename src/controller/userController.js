var express = require('express');
var request = require('request');
var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var fs = require('fs');
var app = express();
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!",resave: true,saveUninitialized: true}));
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
exports.authenticate = function (req, response) {
    var user = req.body;
            var sql = "select * from users where email='"+user.username+"'";
            //console.log(sql);
            req.getConnection(function(error, conn) {    
            conn.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    res.redirect('/admin/login');
                }
                else{
                    req.session.user = result[0]; 
                    bcrypt.compare(user.password,result[0].password, function(err, res) {
                        if(res) {
                            response.redirect('/');
                           } else {
                            console.log(err);
                           } 
                    }); 
                }
                
        });
    });
    // if (user.username === 'sriram' && user.password === '123456') {
    //     req.session.user_id = 1;
    //     res.redirect('/');
    // } else {
    //     res.redirect('/admin/login');
    // }
};
exports.store = function (req, res) {
    var user = req.body;
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
exports.dashboard = function(req,res){
    req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM posts ORDER BY id DESC',function(err, rows, fields) {
            //if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('user/list', {
					title: 'User List', 
					data: ''
				})
			} else {
				// render to views/user/list.ejs template file
				res.render('post/list', {
					title: app_name + 'Admin portal', 
					data: rows
				})
			}
		})
	})
}
exports.new_post = function (req, res) { 
    // var str = '<p>fgngtynty tgnytmnj fghnty6 hr4t5 grfth5ty trju ytjytmn gtj6tykjty trjhrh<img alt="" src="/uploads/562377_374359389278412_1622862912_n.jpg" style="height:800px; width:718px" /></p>';
    // var regex = /<img.*?src="(.*?)"/;
    // var src = regex.exec(str);
    // console.log(src[1]);
    res.render('admin/new_post', {
        title: app_name + 'Make a new post'
    })
};
exports.uploads = function(req,res) {
    fs.readFile(req.files.upload.path, function (err, data) {
        //var newPath = __dirname + '/../public/uploads/' + req.files.upload.name;
        var newPath ='./public/uploads/' + req.files.upload.name;
        fs.writeFile(newPath, data, function (err) {
            if (err) console.log({err: err});
            else {
                //var url ="/uploader/" + req.files.upload.name 
                html = "";
                html += "<script type='text/javascript'>";
                html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
                html += "    var url     = \"/uploads/" + req.files.upload.name + "\";";
                html += "    var message = \"Uploaded file successfully\";";
                html += "";
                html += "window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
                html += "</script>";
                res.send(html);
            }
        });
    });
}
exports.store_post = function(req,res,next){
    var post = req.body;
    str = post.description;
    var regex = /<img.*?src="(.*?)"/;
    var src = regex.exec(str);
    var thumbnail = null;
    if(src.length>1)
        thumbnail = src[1];
    var sql = "INSERT INTO posts (title,short_description,description,thumbnail) VALUES ('"+post.title+"','"+post.short_description+"', '"+post.description+"', '"+thumbnail+"')";
            req.getConnection(function(error, conn) {    
            conn.query(sql, function (err, result) {
                if (err) throw err;   
                res.redirect('/');
            });
        });
}
