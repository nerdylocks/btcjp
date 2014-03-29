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

var LocalEndpoints = {
	btc_address: function(address) {
		return 'http://localhost:3333/json/'+address+'.json';
	},
	recent: function(address){
		return 'http://localhost:3333/json/'+address+'_received.json';
	}
}

module.exports.getInfoByAddress = function(address, onResult){
	//var url = EndpointBuilder.allInfoByAddress(address);
	var url = LocalEndpoints.btc_address(address);
	rest.getJson(url, onResult);
};

module.exports.getReceivedByAddress = function(address, onResult){
	//var c = confirmations || 2;
	//var url = EndpointBuilder.getReceivedUrl(address, 2);
	var url = LocalEndpoints.recent(address);
	rest.getJson(url, onResult);
}