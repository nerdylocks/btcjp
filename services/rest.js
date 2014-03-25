var http = require('http'),
    https = require('https');

//TODO: Finish generalizing REST calls
exports.getJson = function(url, onSuccess){
    var req = https.get(url, function(res){
        var rawData;

        res.on('data', function(chunk){
            rawData = JSON.parse(chunk);            
        });

        res.on('end', function(){
            onSuccess(res.statusCode, rawData);
            console.log("getJson::DONE");
        });
    });

    req.on('error', function(error){
        console.log({status: 500, message: "Internal Error"});
    });

    req.end();
};