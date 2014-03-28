var parse = require('../services/parse.js');
//var q = require('Q');
var Q = require('queuelib');
var api = require("ripple-gateway-data-sequelize-adapter");





module.exports.checkForNewTx = function(address){
	
	var transactions = {
		received: 0, 
		total_received: 0, 
		diff: 0
	};


	// function q1 (then){
	// 	parse.getReceivedByAddress(address, function(statusCode, rawData){
	// 		if(statusCode == 200){
	// 			transactions.received = rawData;
	// 			if(then){
	// 				then();
	// 			}
	// 		} else {
	// 			console.log('ERROR: ' + statusCode);
	// 		}
	// 	});	
	// }	

	// function q2(then){
	// 	parse.getInfoByAddress(address, function(statusCode, rawData){
	// 		if(statusCode == 200){
	// 			transactions.total_received = rawData['total_received'];
	// 			if(then){
	// 				then();
	// 			}
	// 		} else {
	// 			console.log('ERROR: ' + statusCode);
	// 		}
	// 	});	

	// }
	
	// q1(q2);
	// q2(check);

	//Use Q instead of callbacks !!!!!!
	function difference(v1, v2){
		return v2 - v1;
	};

	var myQ = new Q;

	myQ.pushAsync({address: address}, function(params, q){
		parse.getReceivedByAddress(address, function(statusCode, rawData){
			if(statusCode == 200){
				transactions.received = rawData;
				console.log(transactions);
			} else {
				console.log('ERROR: ' + statusCode);

			}
			q.done();
		});
	});

	myQ.pushAsync({address: address}, function(params, q){
		parse.getInfoByAddress(address, function(statusCode, rawData){
			if(statusCode == 200){
				transactions.total_received = rawData['total_received'];
				console.log(transactions);
			} else {
				console.log('ERROR: ' + statusCode);
			}
			q.done();
		});
	});

	myQ.pushAsync({}, function(params, q){
		check();
		q.done();
	});



	function check(){
		console.log("checked at " + new Date());
		transactions.diff = difference(transactions.received, transactions.total_received);

		console.log(transactions);
		
		if(transactions.diff > 0){
			sendPayment(transactions.diff);
			setTimeout(function(){
				myQ.pushAsync({address: address}, function(params, q){
					parse.getReceivedByAddress(address, function(statusCode, rawData){
						if(statusCode == 200){
							transactions.received = rawData;
							console.log(transactions);
						} else {
							console.log('ERROR: ' + statusCode);

						}
						q.done();
					});
				});

				myQ.pushAsync({address: address}, function(params, q){
					parse.getInfoByAddress(address, function(statusCode, rawData){
						if(statusCode == 200){
							transactions.total_received = rawData['total_received'];
							console.log(transactions);
						} else {
							console.log('ERROR: ' + statusCode);
						}
						q.done();
					});
				});

				myQ.pushAsync({}, function(params, q){
					check();
					q.done();
				});
			}, 60000);
		} else {
			setTimeout(function(){
				myQ.pushAsync({address: address}, function(params, q){
					parse.getReceivedByAddress(address, function(statusCode, rawData){
						if(statusCode == 200){
							transactions.received = rawData;
							console.log(transactions);
						} else {
							console.log('ERROR: ' + statusCode);

						}
						q.done();
					});
				});

				myQ.pushAsync({address: address}, function(params, q){
					parse.getInfoByAddress(address, function(statusCode, rawData){
						if(statusCode == 200){
							transactions.total_received = rawData['total_received'];
							console.log(transactions);
						} else {
							console.log('ERROR: ' + statusCode);
						}
						q.done();
					});
				});

				myQ.pushAsync({}, function(params, q){
					check();
					q.done();
				});
			}, 60000);
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