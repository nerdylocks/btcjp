'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;
var http = require('http');
var https = require('https');
/*
 * Use Handlebars for templating
 */


// For gzip compression
app.use(express.compress());

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    // app.engine('handlebars', exphbs({
    //     defaultLayout: 'main',
    //     layoutsDir: 'dist/views/layouts/',
    //     partialsDir: 'dist/views/partials/'
    // }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));

} else {
    // app.engine('handlebars', exphbs({
    //     // Default Layout and locate layouts and partials
    //     defaultLayout: 'main',
    //     layoutsDir: 'views/layouts/',
    //     partialsDir: 'views/partials/'
    // }));

    // Locate the views
    app.set('views', __dirname + '/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/assets'));
}

// Set Handlebars
app.set('view engine', 'handlebars');

var rest = require('./services/rest.js');

/*
 * Routes
 */
// Index Page
app.get('/', rest.getTxn);

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);