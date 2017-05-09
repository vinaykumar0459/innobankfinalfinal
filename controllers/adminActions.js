var mongoose = require('mongoose');
var connection = require("./userProfileSchema");
var nodemailer=require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
exports.getNewAccounts = function(req,res){
        connection.find({isActivated:false},function(err,docs){
            res.json({'docs':docs})
        })
        
}

exports.DeclineAccounts = function(req,res){
    var accNo = req.params.id;
    connection.remove({aadharcardNumber:accNo},function(err,docs){
            res.json({'statusCode':110})
        })
}

exports.acceptUser = function(req,res){
    console.log("accept")
    var accountNumber = req.body.aadharcardNumber;
    var Name = req.body.firstName;
    var lastFive = accountNumber.toString().slice(-5);
    var firstFour = Name.toString().replace(/ /g,'').slice(0,4);
    var userID = firstFour + lastFive;
    connection.update({aadharcardNumber: parseInt(accountNumber)},{$set:{'accountNumber':parseInt(accountNumber),'isActivated':true,'userID':userID}},function(err,docs){
        if(err){
            res.json('error')
        }else{
            const nodemailer = require('nodemailer');
            const xoauth2 = require('xoauth2');

            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                    type: 'OAuth2',
                    user: 'innobankindia@gmail.com',
                    clientId: '648860037400-juj2jjut5f6tnhk322ma9ti1u7pak0q0.apps.googleusercontent.com',
                    clientSecret: 'xUHvvlkXTlmWAhenb9K9bpUD',
                    refreshToken: '1/YYSzlgJaWjmGl89RuYxneeUzp92Jqd4cNu9NqMCBVOM',
                    accessToken: 'ya29.GlsMBAX1weZ1zkP0V3IuIcL2T2LxNyg3n5Of1fp6GLVbjCIY0flHrtZvOKcwc9GB98LglG7ZUSPQ9OTPYxZ77RTJ6P4daTwTOawSgEGirjmBdtB3_UajCukk8Qxk'
                
                }
            })

            var mailOptions = {
                from: 'admin <innobankindia@gmail.com>',
                to: req.body.email,
                subject: 'InnoBank Account Activated',
                html: '<h3>Hello Customer<h3><br><br>This is to convey that your InnoBank account has been activated, you can enjoy our services from now on <br> userid:'+userID+'<br>Account Number :'+accountNumber+'<br>register for EBanking at <a href="http://localhost:4200/register">Register</a>'
            }

            transporter.sendMail(mailOptions, function (err, res) {
                if(err){
                    console.log('Error'+err);
                } else {
                    console.log('Email Sent');
                }
            })
            res.json({'statusCode':110})
           }
           
    })
   // res.json('');
}
