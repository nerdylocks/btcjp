var rest = require('../services/rest.js');

var EndpointBuilder = {
	host: 'https://blockchain.info',
	allInfoByAddress: function(address){
		return this.host + '/address/' + address + '?format=json';
	},
	getReceivedUrl: function(address, confirmations) {
		return this.host + '/q/getreceivedbyaddress/' + address + '?confirmations=' + confirmations + '&format=json';
	}
};

module.exports.getInfoByAddress = function(address, onResult){
	var url = EndpointBuilder.allInfoByAddress(address);
	rest.getJson(url, onResult);
};

module.exports.getReceivedByAddress = function(address, onResult){
	//var c = confirmations || 2;
	var url = EndpointBuilder.getReceivedUrl(address, 2);
	rest.getJson(url, onResult);
}