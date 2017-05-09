// var express = require("express");
// var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs('mongodb://innobank:innobank@ds123410.mlab.com:23410/innobank', [" fundtransfer "]);
var statementArray = [];

exports.miniStatement = function(request, response) {
    statementArray = [];
    db.fundtransfer.find({
            $or: [{
                fromAccount: request.params.id
            }, { toAccount: request.params.id }]
        },
        function(error, data) {
            if (error) {
                console.log("error in executing the query");
                response.send("error");
                throw error
            } else {
                if (data[0] != "") {
                    statementArray.push(data);
                    console.log(statementArray);
                    response.json(data);
                    statementArray.sort(function(a, b) {
                        console.log(statementArray);
                        // Turn your strings into dates, and then subtract them
                        // to get a value that is either negative, positive, or zero.
                        return new Date(b.amount) - new Date(a.amount);

                    });

                } else {
                    response.send("no transaction are done");
                }
            }
        });
};

// module.exports = router;