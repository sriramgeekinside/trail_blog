var express = require('express')
var app = express()
var router = express.Router();
var users = require('../src/controller/userController');
var mw = require('../src/auth-middleware.js');
router.route('/login').get(users.login);
router.route('/authenticate').post(users.authenticate);
router.route('/create').post(users.store);
router.get('/make-post',function(req,res,next){
    mw.authChecker(req,res,next);
},users.new_post);
router.route('/new-post').post(users.store_post);
router.route('/edit-post/(:id)').get(users.edit_post);
router.route('/edit-post').post(users.updatePost);
module.exports = router;