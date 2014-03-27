var parse = require('../services/parse.js');
var q = require('Q');

module.exports.checkForNewTx = function(request, response){
	
	var received = 0, 
		total_received = 0, 
		diff = 0;
		
	function q1 (then){
		parse.getReceivedByAddress(request.params.address, function(statusCode, rawData){
			if(statusCode == 200){
				received = rawData;
				if(then){
					then();
				}
			} else {
				console.log('ERROR: ' + statusCode);
			}
		});	
	}	

	function q2(then){
		parse.getInfoByAddress(request.params.address, function(statusCode, rawData){
			if(statusCode == 200){
				total_received = rawData['total_received'];
				if(then){
					then();
				}
			} else {
				console.log('ERROR: ' + statusCode);
			}
		});	

	}
	
	q1(q2);
	q2(check);

	function difference(v1, v2){
		return v2 - v1;
	};

	function check(){
		diff = difference(received, total_received);
		if(diff > 0){
			sendPayment(diff);
			setTimeout(function(){
				q1(q2);
				q2(check);
			}, 6000);
			out();
		} else {
			setTimeout(function(){
				q1(q2);
				q2(check);
			}, 6000);
			out();
		}


	}
	
	function sendPayment(payment){
		console.log('SENDING...', payment);
	}	

	function out(){
		response.send({total_received: total_received, received: received, diff: diff});
	}
};