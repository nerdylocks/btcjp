'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;
var db = require('ripple-gateway-data-sequelize-adapter');
var fs = require('fs');


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

var txn = require('./services/txn.js');

fs.readFile('config.json', function(error, data){
	if(error){
		console.log("ERROR", error);
	} else {
		var config = JSON.parse(data);
		txn.checkForNewTx(config['btc_inbound']);
	}
});

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);