var request = require('request');
var app_name = "Red leaf | "
exports.allPosts = function(req, res) {
  // var options = prepareCataloguesAPIHeaders(req);
  // request(options, function(err, response, body){
  //   res.send(body);
  // });
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
					data: rows,
				})
			}
		})
	})
};
exports.show = function(req, res) {
	var id = req.params.id; 
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM posts where id ='+id,function(err, rows, fields) {
            //if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('user/list', {
					title: 'User List', 
					data: ''
				})
			} else {
				// render to views/user/list.ejs template file
				res.render('post/show', {
					title: app_name + rows[0].title, 
					data: rows[0]
				})
			}
		})
	})
};

exports.apiPOST = function(req, res) {
  var options = prepareCataloguesAPIHeaders(req);
  options.json = true;
  options.body = stripBody(req.body);
  request(options, function(err, response, body){
    res.send(body);
  });
};