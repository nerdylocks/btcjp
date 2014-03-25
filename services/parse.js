var rest = require('../services/rest.js');

var blockchainOptions = {
    host: 'https://blockchain.info',
    path: '/address/'
};

var buildUrl = function(path){
	return blockchainOptions.host + '/' + path + '/';
};

exports.buildTxn = function(options, address, onResult){
	var options = buildUrl("address");
	var url = options + address + '?format=json';
	rest.getJson(url, onResult);
};