var parse = require('../services/parse.js');

var Transaction = function(options){
	this.address = options.address;
    this.from = options.from;
    this.total_received = (options.total_received / 100000000);
    this.time_stamp = new Date(options.time_stamp);
};

exports.output = function(request, response){
	parse.buildTxn('address', request.params.address, function(statusCode, rawData){
		var txn = new Transaction({
	        address: rawData["address"],
	        from: rawData["txs"][0]["inputs"][0]["prev_out"]["addr"],
	        total_received: rawData["total_received"],
	        time_stamp: rawData["txs"][0]["time"]
	    });
	    response.send(txn);
	});
};