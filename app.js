'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;
var db = require("ripple-gateway-data-sequelize-adapter");


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

//var txn = require('./services/txn.js');

/*
 * Routes
 */
//12JMQyFbsdNuQBu5wwbpUFURsfLVq9Am17
//1AbwTNnCN2KgbP43oudZFe4YPsTdT2y4B5
//txn.checkForNewTx('1AbwTNnCN2KgbP43oudZFe4YPsTdT2y4B5');
var txn = {};
db.externalTransactions.read(3, function(data){
	console.log(data);
});

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);