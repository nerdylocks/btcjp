var http = require('http'),
    https = require('https');
    events = require('events'),
    util = require('util');

Rest = function(){
    events.EventEmitter.call(this);

    var self = this;
    this.getJson = function(url) {
        var rawData = '';
        var req = http.get(url, function(res){
            res.setEncoding('utf8');
            var _obj;

            res.on('data', function(chunk){
                rawData += chunk;            
            });

            res.on('end', function(){
                try {
                    _obj = JSON.parse(rawData);

                    self.emit('data', _obj);
                } catch (e){
                    console.log(e);
                }
            });

        });

        req.on('error', function(error){
            console.log("ERROR", error.message);
        });

        req.end();
    }
};

util.inherits(Rest, events.EventEmitter);

module.exports = new Rest();