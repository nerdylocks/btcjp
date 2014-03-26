var rest = require('../services/rest.js');

var blockchainOptions = {
    host: 'https://blockchain.info'
};

var buildUrl = function(path){
	return blockchainOptions.host + '/' + path + '/';
};

module.exports.getTxnDetails = function(options, txnHash, onResult){
	var options = buildUrl(options);
	var url = options + txnHash;
	rest.getJson(url, onResult);
};

module.exports.buildTxn = function(options, address, onResult){
	var options = buildUrl(options);
	var url = options + address + '?format=json';
	rest.getJson(url, onResult);
};