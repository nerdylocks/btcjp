'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;
var db = require('ripple-gateway-data-sequelize-adapter');
var fs = require('fs');
var nconf = require('nconf');


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

fs.readFile('config.json', 'utf-8', function(error, data){
	if(error){
		console.log("ERROR", error);
	} else {
		var config = JSON.parse(data);
		setInterval(function(){
			txnEmit.getNumbers(config['btc_inbound']);
		}, 10000);
	}
});

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);