var express = require('express')
var app = express()
var router = express.Router();
var users = require('../src/controller/userController');
router.route('/login').get(users.login);
router.route('/authenticate').post(users.authenticate);
router.route('/create').post(users.store);
router.route('/make-post').get(users.new_post);
router.route('/new-post').post(users.store_post);
module.exports = router;