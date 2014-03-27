'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;

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

var txn = require('./factory/txn.js');

/*
 * Routes
 */
// Index Page
//app.get('/:address', txn.output);
//app.get('/test/:address', txn.checkForNewTx);
//12JMQyFbsdNuQBu5wwbpUFURsfLVq9Am17
//1AbwTNnCN2KgbP43oudZFe4YPsTdT2y4B5
txn.checkForNewTx('1AbwTNnCN2KgbP43oudZFe4YPsTdT2y4B5');

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);