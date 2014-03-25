'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;
var http = require('http');
var https = require('https');

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
app.get('/:address', txn.output);

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);