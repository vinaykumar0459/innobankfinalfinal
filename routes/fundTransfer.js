var express = require("express");
var router = express.Router();
var controller=require("../controllers/userActions");
router.post("/fundtransfer",function(req,res){
console.log(req.body);
controller.fundTransfer(req,res);
// db.fundtransfer.save(req.body,function(err,data){
//     console.log(data);
// })
//res.json("hai");
//res.json("success");
})
router.get("/ministatement/:id",function(req,res){
    console.log("hai");
    controller.miniStatement(req,res);

    
});
router.get("/allstatements/:id",function(req,res){
     controller.allStatements(req,res); 
})
router.post("/detailstatement/:id",function(req,res){
    controller.detailedStatement(req,res);
})
module.exports = router