var express = require('express')
var app = express()
var router = express.Router();
var users = require('../src/controller/userController');
router.route('/login').get(users.login);
router.route('/authenticate').post(users.authenticate);
router.route('/create').post(users.store);
module.exports = router;