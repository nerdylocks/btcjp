var http = require('http');
var https = require('https');

exports.getTxn = function(req, response, next){
    var req = https.get('https://blockchain.info/address/12JMQyFbsdNuQBu5wwbpUFURsfLVq9Am17?format=json', function(res){
        var _txn = [];
        res.on('data', function(chunk){
            response.send({status: res.statusCode, data: JSON.parse(chunk)});
        });

        res.on('end', function(){
            console.log("DONE");
        });
    });

    req.on('error', function(error){
        console.log('ERROR ' + error.message);
    });
};