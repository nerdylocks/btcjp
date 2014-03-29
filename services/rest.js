var http = require('http'),
    https = require('https');

module.exports.getJson = function(url, onSuccess){
    var req = http.get(url, function(res){
        var rawData = '';
        res.setEncoding('utf8');
        var _obj;

        res.on('data', function(chunk){
            rawData += chunk;            
        });

        res.on('end', function(){
            try {
                _obj = JSON.parse(rawData);
                //console.log(_obj);
                onSuccess(res.statusCode, _obj);
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