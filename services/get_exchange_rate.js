var rest = require('../services/rest.js'),
	events = require('events'),
	util = require('util'),
	conf = require('../config/nconf.js');

var issuerAddress = conf.get('EXCHANGE_ISSUER_ADDRESS');

var data = {
	pairs : [
		{
		    base:{currency:"BTC","issuer": issuerAddress},
		    trade:{currency:"XRP"}
		}
	]
};

var toPost = JSON.stringify(data);

var postOptions = {
	//host: 'http://api.ripplecharts.com',
	host: 'RippleChartsStagingAPI-869095469.us-east-1.elb.amazonaws.com', //update to prod endpoint
	port: '80',
	path: '/api/exchangerates',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
  		'Content-Length': toPost.length
	}
};

var exchangeData = rest;
var Exchange = function(){
	this.getRate = function(type){
		if(!type){
			type = 'last'; //default 
		}
		var self = this;
		exchangeData.post(postOptions, toPost);

		exchangeData.once('data', function(data){
			var exchangeRate = data[0][type];
			self.emit('gotEchangeRate', exchangeRate);
		});
	}
};
util.inherits(Exchange, events.EventEmitter);

module.exports = new Exchange();