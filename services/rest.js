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
            res.setEncoding('utf-8');
            var _obj;

            res.on('data', function(chunk){
                rawData += chunk;            
            });

            res.on('end', function(){
                try {
                    _obj = JSON.parse(rawData);
                    self.emit('data', _obj);
                } catch (error){
                    console.log(error);
                    //TODO: Send an email
                }
            });

        });

        req.on('error', function(error){
            console.log(500, {"ERROR": error.message});
        });

        req.end();
    };

    this.post = function(postOptions, dataToPost){
        var req = http.request(postOptions, function(res){

            var payLoadData = '';
            res.setEncoding('utf-8');
            
            var _obj;

            res.on('data', function(chunk){
                payLoadData += chunk;
            });

            res.on('end', function(){

                try {
                    _obj = JSON.parse(payLoadData);
                    self.emit('data', _obj);
                } catch(error){
                    console.log('caught', error);
                    //TODO: send email
                }
            })
        });

        req.on('error', function(error){
            console.log(500, {"ERROR": error.message});
        });

        req.write(dataToPost);
        req.end();
    }
};

util.inherits(Rest, events.EventEmitter);

module.exports = new Rest();