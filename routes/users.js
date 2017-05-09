var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var controller=require("../controllers/userActions");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/createnewaccount', function(req, res, next) {


    controller.createAccount(req, res);

    // res.json("data")
});
router.post('/forgotpassword', function(req, res, next) {


    controller.forgotPassword(req, res);

    // res.json("data")
});
module.exports = router;
