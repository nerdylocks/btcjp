var http = require('http');
var https = require('https');

exports.getTxn = function(req, response, next){

    var blockchainOptions = {
        host: 'https://blockchain.info',
        path: '/address/12JMQyFbsdNuQBu5wwbpUFURsfLVq9Am17?format=json'
    };

    var req = https.get(blockchainOptions.host + blockchainOptions.path, function(res){
        var Transaction = function(options){
            this.address = options.address;
            this.total_received = options.total_received;
            this.time_stamp = new Date(options.time_stamp);
        };

        res.on('data', function(chunk){
            var rawData = JSON.parse(chunk);

            var txn = new Transaction({
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