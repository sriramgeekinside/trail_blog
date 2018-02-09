var express = require('express')
var app = express()
var router = express.Router();
var catalogues = require('../src/controller/postcontroller');

var app_name = "Red leaf | "
// SHOW LIST OF POSTS
app.get('/', function(req, res, next) {
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
					title: app_name + 'Virtual movie', 
					data: rows
				})
			}
		})
	})
})

router.route('/catalogues')
    .get(catalogues.apiGET)
    .post(catalogues.apiPOST);
module.exports = router;

//module.exports = app
