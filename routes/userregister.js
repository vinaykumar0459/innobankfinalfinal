var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var controller=require("../controllers/userActions");

router.get('/:uid/:mobile', function(req, res, next) {
    console.log(req.params.mobile);
    controller.checkAccount(req,res);
})

router.post('/',function(req, res, next){
    controller.savePassword(req,res);
})
module.exports = router;