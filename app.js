'use strict';

/*
 * Express Dependencies
 */
var express = require('express'),
	app = express(),
	port = 3000,
	fs = require('fs'),
	conf = require('./config/nconf.js');

// For gzip compression
app.use(express.compress());

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    
    // Locate the views
    app.set('views', __dirname + '/dist/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));

} else {
    
    // Locate the views
    app.set('views', __dirname + '/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/assets'));
}

var txnEmit = require('./services/txn_emitter.js');
var getExchangeRate = require('./services/get_exchange_rate.js');

var btcInboundAddress = conf.get('BTC_INBOUND');

setInterval(function(){
	txnEmit.getNumbers(btcInboundAddress);
}, 10000);

getExchangeRate.getRate();

getExchangeRate.on('gotEchangeRate', function(exchangeRage){
	console.log(exchangeRage);
});

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
//TODO: Send an email server started