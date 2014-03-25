var http = require('http'),
    https = require('https'),
    txnObject = require('../factory/txn.js');

exports.getTxn = function(req, response, next){

    //12JMQyFbsdNuQBu5wwbpUFURsfLVq9Am17

    var blockchainOptions = {
        host: 'https://blockchain.info',
        path: '/address/'
    };

    var req = https.get(blockchainOptions.host + blockchainOptions.path + req.params.address + '?format=json', function(res){
        res.on('data', function(chunk){
            var rawData = JSON.parse(chunk);

            var txn = new txnObject.Transaction({
                address: rawData["address"],
                total_received: rawData["total_received"],
                time_stamp: rawData["txs"][0]["time"]
            });

            if(res.statusCode == 200){
                response.send({status: res.statusCode, data: txn});
            } else {
                response.send({status: 500, message: "Internal Error"});
            }
        });

        res.on('end', function(){
            console.log("DONE");
        });
    });

    req.on('error', function(error){
        console.log('ERROR ' + error.message);
    });
};