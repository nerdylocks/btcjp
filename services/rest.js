var http = require('http'),
    https = require('https');

module.exports.getJson = function(url, onSuccess){
    var req = https.get(url, function(res){
        var rawData = '';
        res.setEncoding('utf8');
        var _obj;

        res.on('data', function(chunk){
            rawData += chunk;            
        });

        res.on('end', function(){
            try {
                _obj = JSON.parse(rawData);
                onSuccess(res.statusCode, _obj);
                console.log("getJson::DONE");
            } catch (e){
                console.log(e);
            }
        });

    });

    req.on('error', function(error){
        console.log("ERROR", error.message);
    });

    req.end();
};