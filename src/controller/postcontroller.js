var request = require('request');
var app_name = "Red leaf | "
exports.apiGET = function(req, res) {
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
					data: rows
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