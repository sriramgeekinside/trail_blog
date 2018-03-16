var express = require('express')
var app = express()
var router = express.Router();
var posts = require('../src/controller/postcontroller');
var app_name = "Red leaf | ";
router.route('/').get(posts.allPosts);
router.get('/post/(:id)',posts.show);
module.exports = router;