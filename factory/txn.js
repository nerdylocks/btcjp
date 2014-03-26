var parse = require('../services/parse.js');

var Transaction = function(options){
	this.hash = options.hash;
	this.address = options.address;
    this.from = options.from;
    this.total_received = (options.total_received / 100000000);
    this.time_stamp = new Date(options.time_stamp);
};

Transaction.prototype.getBlockInfo = function(txnHash){
	var that = this;
	parse.getTxnDetails('rawtx', txnHash, function(statusCode, rawData){
		that.block_height = rawData["block_height"];
	});
};

module.exports.output = function(request, response){
	parse.buildTxn('address', request.params.address, function(statusCode, rawData){
		var txn = new Transaction({
			hash: rawData["txs"][0]["hash"],
	        address: rawData["address"],
	        from: rawData["txs"][0]["inputs"][0]["prev_out"]["addr"],
	        total_received: rawData["total_received"],
	        time_stamp: rawData["txs"][0]["time"]
	    });

	    txn.getBlockInfo(txn.hash);

	    setTimeout(function(){
	    	response.send(txn);
	    }, 800);
	    
	});
};