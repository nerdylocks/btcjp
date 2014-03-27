var parse = require('../services/parse.js');
var q = require('Q');

module.exports.checkForNewTx = function(address){
	
	var received = 0, 
		total_received = 0, 
		diff = 0;
	function rad(){

	}	
	function q1 (then){
		parse.getReceivedByAddress(address, function(statusCode, rawData){
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
		parse.getInfoByAddress(address, function(statusCode, rawData){
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
		console.log("checked at " + new Date());
		diff = difference(received, total_received);
		console.log(received, total_received, diff);
		if(diff > 0){
			sendPayment(diff);
			setTimeout(function(){
				q1(q2);
				q2(check);
			}, 60000);
			//out();
		} else {
			setTimeout(function(){
				q1(q2);
				q2(check);
			}, 60000);
			//out();
		}

	}
	var lastSent = 0;
	function sendPayment(payment){
		var toSend = payment;
		if(lastSent != toSend) {
			console.log('SENDING...', payment);	
			lastSent = toSend;
		} else if(lastSent == toSend){
			console.log("Already sent " + lastSent + " so not sending anything.");
		} else {
			lastSent = 0;
			console.log('clearing last payment');
		}
	}

	function out(){
		// response.setHeader("Content-Type", "application/json");
		//response.send({total_received: total_received, received: received, diff: diff});

	}
};