var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://innobank:innobank@ds121980.mlab.com:21980/innobank');
var transferedschema = mongoose.Schema( {amount : Number, date : Date, to : Number, currentBalance : Number})
   var receivedschema =mongoose.Schema( {amount : Number, date : Date, from : Number, currentBalance : Number})
var userregisterSchema = mongoose.Schema({
 firstName: String,
    lastName:String,
    email: String,
    password:String,
    mobileNumber:Number,
    gender:String,
    dob : Date,
    userID:String,
    address:String,
    pancardNumber:String,
    aadharcardNumber:Number,
    createdDate:Date,
    isRegistered:Boolean,
    isActivated:Boolean,
    isAdmin:Boolean,
    totalAmount:Number,
    transfered:[transferedschema],
    received:[receivedschema],

});

var transfered = mongoose.model("transfered",transferedschema)
var received = mongoose.model("received",transferedschema)
var user = mongoose.model("register",userregisterSchema);
module.exports = user;