var parse = require('../services/parse.js');
var q = require('Q');

module.exports.checkForNewTx = function(request, response){
	
	var received, total_received, diff;


	function q1 (){
		parse.getReceivedByAddress(request.params.address, function(statusCode, rawData){
			if(statusCode == 200){
				received = rawData;
				console.log('q1 done');
			} else {
				console.log('ERROR: ' + statusCode);
			}
		});	
	}	

	function q2(){
		parse.getInfoByAddress(request.params.address, function(statusCode, rawData){
			if(statusCode == 200){
				total_received = rawData['total_received'];
				console.log('q2 done');
			} else {
				console.log('ERROR: ' + statusCode);
			}
		});	

	}
	
	q.all([q1(), q2()])
	.done(function(){
		console.log("yay");
	});

	function diff(v1, v2){
		return v2 - v1;
	};

	function out(){
		response.send({total_received: total_received, received: received});
	}
};