var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var controller=require("../controllers/userActions");
/ GET users listing. /
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/
router.post('/', function(req, res, next) {
   controller.checkUser(req,res);
})

module.exports = router;