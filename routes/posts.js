var express = require('express')
var app = express()
var router = express.Router();
var posts = require('../src/controller/postcontroller');
var admin = require('../src/controller/usercontroller');
var mw = require('../src/auth-middleware.js');
var app_name = "Red leaf | ";
router.route('/').get(posts.allPosts);
router.get('/post/(:id)',posts.show);
router.get('/middleware', function (req, res,next) {
    mw.authChecker(req,res,next);
},admin.dashboard)
module.exports = router;