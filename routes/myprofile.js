var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var controller = require("../controllers/userActions");
/* GET users listing. */

router.get('/:id', function(req, res, next) {

    controller.myprofile(req, res);
});

module.exports = router;