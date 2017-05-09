var mongoose = require('mongoose');
var connection = require("./userProfileSchema");

// Create New Account
// Create New Account
exports.createAccount = function(req, res) {

        var data = connection({
            firstName: req.body.fname,
            lastName: req.body.lname,
            email: req.body.email,
            mobileNumber: req.body.mobile,
            gender: req.body.gender,
            dob: req.body.dob,
            address: req.body.address,
            pancardNumber: req.body.pan,
            aadharcardNumber: req.body.aadhar,
            createdDate: '',
            isActivated: false,
            totalAmount:req.body.deposit,
        });
        console.log(data);
        // invalid  input data
        // if (data.firstName == "" || data.lastName == "" || data.email == "" || data.mobileNumber == "" || data.gender == "" ||
        //     data.dob == "" || data.pancardNumber == "" || data.aadharcardNumber == "" || data.address == "") {
        //     res.json({ err: 0 });
        // } else {
        // checking account exist are not
        connection.find({ $and: [{ email: req.body.email }, { aadharcardNumber: req.body.aadhar }] }, function(err, docs) {
            console.log(docs);


            if (docs[0] == null) {
                if(req.body.deposit >= 5000){
                    //create new bank account
                data.save(function(err, data) {
                    console.log(data);
                    if (err) {
                        throw err
                    } else {

                        res.json(1);
                    }
                })
                }else{
                    res.json(2);
                }
                
            } else {
                res.json(0);
            }



        })
    }
     // Forgot password 
exports.forgotPassword = function(req, res) {
    console.log(req.body);
    var user = connection({
        userID: req.body.UID,
        mobileNumber: req.body.mobile,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });
    connection.find({ $and: [{ userID: req.body.UID }, { mobileNumber: req.body.mobile }] }, function(err, data) {
        console.log(data);
        if (err) {
            throw err;
        } else if (data[0] == null) {
            console.log();
            res.json(0);
        } else {
            if (req.body.password === req.body.confirmPassword) {
                connection.update({ mobileNumber: req.body.mobile }, { $set: { password: req.body.password } }, function(err, docs) {});
                console.log("hghgsahghg");
                res.json(1);
            } else {
                console.log("Passwords Mismatched");
                res.json(2);
            }
        }
    })
}
//myprofile 
exports.myprofile = function(req, res) {

    var aadhar = req.params.id;
    console.log(aadhar);
    // connection.find(function(err, data) {
    //     if (err) {
    //         throw err;
    //     } else {
    //         console.log(data);
    //     }
    // });
    connection.find({ aadharcardNumber: aadhar }, function(err, docs) {
        console.log(docs[0]);
        if (err) {
            console.log(err);
        } else {
            res.json(docs);
        }
    });

}
//fundTransfer
exports.fundTransfer = function(req,res){
     var from = req.body.fromAccount;
    var to = req.body.accountnum; 
    var transferData =
        {amount : req.body.amount,date:req.body.date, to :to, currentBalance:undefined};
 var receivedData = {amount : req.body.amount,date:req.body.date, from:from, currentBalance:undefined};
   
    connection.find({ aadharcardNumber:from},function(err,docs){

      // console.log(docs);
        if(err)
        throw err;
        else{
            connection.find({aadharcardNumber:to},function(err,data){
                console.log(data);
           
        if (docs[0] != null && data[0] != null ) {
            var amount = docs[0].totalAmount;
            if(amount >= parseInt(req.body.amount)){
            var receiverAmount = data[0].totalAmount;
            docs[0].totalAmount = parseInt(amount) - parseInt(req.body.amount);
             transferData.currentBalance =parseInt( amount)- parseInt(req.body.amount);
            data[0].totalAmount =parseInt( receiverAmount)+parseInt(req.body.amount);
           // data[0].received.push(receivedData);
             receivedData.currentBalance = parseInt( receiverAmount)+parseInt(req.body.amount);
            docs[0].transfered.push(transferData);
            //console.log( docs[0].transfered);
             
            data[0].received.push(receivedData);
            //console.log(  data[0].received);
            data[0].save();
            docs[0].save();
            res.json({data:"success"});
            // response.json(docs[0]);
        }else{
            res.json({data:"Insufficient Funds"});
        }}
        });

        }

    })
   
}
//var user = require("./userProfileSchema.js");
//var statementArray = [],
    // sortedStatement = [],
 // ministatementArray = [],
   

exports.miniStatement = function(request, response) {
  var  statementArray=[],ministatementArray = [];
  //  console.log("hello");
   // console.log(request.params.id );
    connection.find({ aadharcardNumber: request.params.id }, function(error, data) {
        if (error) {
            console.log("error while executing the query");
            throw error;
        } else if (data[0] != null) {
            // objId = data[0]._id;
            transferredArray = data[0].transfered;
            receivedArray = data[0].received;
            // console.log(objId);
            if (transferredArray[0] == null && receivedArray[0] == null) {
                console.log("no transactions done yet");
                response.json({data:"no transactions"});
            } else {
              //  console.log("hi");
                if (transferredArray[0] != null) {
                  //  console.log("transfer" + transferredArray.length);
                    for (var i = 0; i < transferredArray.length; i++) {
                        statementArray.push(transferredArray[i]);
                        // console.log(statementArray);
                    }
                }
                if (receivedArray[0] != null) {
                    console.log("receive");
                    for (var i = 0; i < receivedArray.length; i++) {
                        statementArray.push(receivedArray[i]);
                        // console.log(statementArray);
                    }
                    // statementArray.push(receivedArray);
                }
                // console.log(statementArray);
                var sortedStatement = statementArray.sort(function(a, b) {
                    return b.date - a.date
                });
                console.log(sortedStatement);
                length = sortedStatement.length;
                if (length > 8) {
                    ministatementArray = sortedStatement.splice(8, length - 8);
                    console.log(ministatementArray);
                    response.json(sortedStatement);
                } else {
                    console.log(sortedStatement);
                    response.json(sortedStatement);
                }
            }
        } else {
            console.log("account number is not present");
            response.json({data:"account number is not present"});
        }
    });
}

exports.allStatements = function(request, response) {
  var  statementArray=[],ministatementArray = [];
  //  console.log("hello");
   // console.log(request.params.id );
    connection.find({ aadharcardNumber: request.params.id }, function(error, data) {
        if (error) {
            console.log("error while executing the query");
            throw error;
        } else if (data[0] != null) {
            // objId = data[0]._id;
            transferredArray = data[0].transfered;
            receivedArray = data[0].received;
            // console.log(objId);
            if (transferredArray[0] == null && receivedArray[0] == null) {
                console.log("no transactions done yet");
                response.json({data:"no transactions"});
            } else {
                console.log("hi");
                if (transferredArray[0] != null) {
                  //  console.log("transfer" + transferredArray.length);
                    for (var i = 0; i < transferredArray.length; i++) {
                        statementArray.push(transferredArray[i]);
                        // console.log(statementArray);
                    }
                }
                if (receivedArray[0] != null) {
                    console.log("receive");
                    for (var i = 0; i < receivedArray.length; i++) {
                        statementArray.push(receivedArray[i]);
                        // console.log(statementArray);
                    }
                    // statementArray.push(receivedArray);
                }
                // console.log(statementArray);
                var sortedStatement = statementArray.sort(function(a, b) {
                    return b.date - a.date
                });
                console.log(sortedStatement);
                length = sortedStatement.length;
                 response.json(sortedStatement);
            }
        } else {
            console.log("account number is not present");
            response.json({data:"account number is not present"});
        }
    });
}

exports.detailedStatement = function(request, response) {
    var  detailedStatement = [],   statementArray=[],resultantStatement=[];
    connection.find({ aadharcardNumber: request.params.id }, function(error, data) {
        if (error) {
            console.log("error while executing the query");
            throw error;
        } else if (data[0] != null) {
           // objId = data[0]._id;
            transferredArray = data[0].transfered;
            receivedArray = data[0].received;
            //console.log(objId);
            if (transferredArray[0] == null && receivedArray[0]== null) {
                console.log("no transactions done yet");
                                response.json({data:"no transactions"});
            } else {
                if (transferredArray[0]!= null) {
                    console.log("transfer" + transferredArray.length);
                    for (var i = 0; i < transferredArray.length; i++) {
                        statementArray.push(transferredArray[i]);
                        // console.log(statementArray);
                    }
                }
                if (receivedArray[0]!= null) {
                    console.log("receive");
                    for (var i = 0; i < receivedArray.length; i++) {
                        statementArray.push(receivedArray[i]);
                        // console.log(statementArray);
                    }
                    // statementArray.push(receivedArray);
                }
                // statementArray.push(transferredArray);
                // statementArray.push(receivedArray);
                 console.log(statementArray);
             var sortedStatement =   statementArray.sort(function(a, b) {
                    return b.date - a.date;
                });
                length = sortedStatement.length;
                console.log(request.body);
                if(length !=0){
                for (var i = 0; i < length; i++) {
                    var date = new Date(sortedStatement[i].date)
                    
                    //console.log(date.setHours(0));
                    var date =(sortedStatement[i].date).toDateString();
                    console.log(new Date(date));
                  
                     if ((sortedStatement[i].date).toDateString() >= (new Date ( request.body.fromDate)).toDateString()) {
                   
                        console.log("1st if called");
                       if ((sortedStatement[i].date).toDateString() <= (new Date (request.body.toDate)).toDateString()) {
 console.log("2nd if called");
                            resultantStatement.push(sortedStatement[i]);
                            console.log(resultantStatement);
                                                   

                        }
                    }
                    
            }
if(resultantStatement[0] != null)
{response.json(resultantStatement);}
else{
   response.json({data:"No Records"});
}

         
        }
                
                
                //console.log(resultantStatement);
            }
        } else {
            console.log("account number is not present");
            response.json(["account number is not present"]);
        }
    });
}



exports.checkAccount = function(req,res){

const crypto = require('crypto');
const cipher = crypto.createCipher('aes192', 'a password');

let encrypted = '';
cipher.on('readable', () => {
  const data = cipher.read();
  if (data)
    encrypted += data.toString('hex');
});
cipher.on('end', () => {
  console.log(encrypted);
  // Prints: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504
});

cipher.write('prudhvi29');
cipher.end();







    // const encrypted = 'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
    // let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    // decrypted += decipher.final('utf8');
    // console.log(decrypted);
    var mobile = req.params.mobile;
    var uid = req.params.uid;
    connection.find({$and:[{userID:uid},{mobileNumber: mobile}]},function(err,docs){
        if(err){
            res.json({"message":"provide the right phone number","code":99});
        }else if(docs == ''){
            res.json({"message":"Account doesn't exits with provided User ID and Mobile Number","code":100});
        }else if(docs[0].isAdmin == true){
            res.json({"message":"Account doesn't exits with provided User ID and Mobile Number","code":110}); 
        }
        else if(docs[0].isRegistered == true){
            res.json({"message":"User already registered with provided User ID and Mobile Number","code":101}); 
        }else{
            res.json({"message":'',"code":102});
        }
        
    })
}

exports.savePassword = function(req,res){
    var uid = req.body.uid;
    var mobile = req.body.mobile;
    var confpassword = req.body.confpassword;
    var password = req.body.password;
    if( password ===  confpassword){
        connection.update({$and:[{userID:uid},{mobileNumber: mobile}]},{$set:{'password':password,'isRegistered':true}},function(err,docs){
			if(err) {  
                res.json({'message':'Error in updating password try again','code':104});  
	        }else{
                res.json({'message':'','code':105});
            } 
	    });
    }else{
        res.json({"message":"passwords didn't match","code":103});
    }
    // res.json
}

exports.checkUser = function(req,res){
    
   connection.find({$and:[{userID:req.body.userID},{password: req.body.password}]},function(err,data){
       if(err){
           throw err;
           console.log(err);
       }else{          
           if(!data.length){
              res.json({data:"wrong credentials", status:0});
           }
           else if(data.length){
                //res.json({data:"Success"});
                console.log(data[0].isAdmin);
                res.json({dataa:"Success", status:1,admin:data[0].isAdmin});
            //req.session.user = data;
           // console.log(req.session.user);
           }

       }
   });
}