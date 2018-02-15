var express = require('express')
var app = express()
var router = express.Router();
var users = require('../src/controller/userController');
router.route('/login').get(users.login);
router.route('/authenticate').post(users.authenticate)
module.exports = router;