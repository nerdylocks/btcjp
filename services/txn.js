var parse = require('../services/parse.js');
//var q = require('Q');
//var Q = require('queuelib');
//var Txn = require('../models/externalTransactions.js');
var db = require("ripple-gateway-data-sequelize-adapter");

module.exports.checkForNewTx = function(address){
	
	var transactions = {
		received: 0, 
		total_received: 0, 
		diff: 0
	};

	var Txn = function(config){
		this.amount = config.amount;
		this.currency = 'BTC';
		this.deposit = true;
		this.status = 'pending';
		this.external_account_id = config.external_account_id;
		this.ripple_transaction_id = config.ripple_transaction_id;
	}
	
	

	var lastSent = 0;
	
	//TODO: Use Q instead of callbacks !!!!!!

	var Make = {
		difference: function (v1, v2){
			return v2 - v1;
		},
		getReceivedByAddress: function (then){
			parse.getReceivedByAddress(address, function(statusCode, rawData){
				if(statusCode == 200){
					transactions.received = rawData;
					if(then){
						then();
					}
				} else {
					console.log('ERROR: ' + statusCode);
				}
			});	
		},	
		getInfoByAddress: function(then){
			parse.getInfoByAddress(address, function(statusCode, rawData){
				if(statusCode == 200){
					transactions.total_received = rawData['total_received'];

					if(then){
						then();
					}
				} else {
					console.log('ERROR: ' + statusCode);
				}
			});	
		},
		check: function(){
			var that = this;

			console.log("checked at " + new Date());

			transactions.diff = Make.difference(transactions.received, transactions.total_received);

			console.log(transactions);
			
			if(transactions.diff > 0){
				Make.queueTxn(transactions.diff);
				setInterval(function(){
					Make.getReceivedByAddress(Make.getInfoByAddress);
					Make.getInfoByAddress(Make.check);
				}, 60000);
			} else {
				setInterval(function(){
					Make.getReceivedByAddress(Make.getInfoByAddress);
					Make.getInfoByAddress(Make.check);
				}, 60000);
			}
		},
		queueTxn: function(payment){
			var toSend = payment;
			var transaction = new Txn({
				amount: payment,
				external_account_id: 21,
				ripple_transaction_id: 3,
			});
			if(lastSent != toSend) {			
				console.log('SUBMITTING TO QUEUE...', payment);	
				db.externalTransactions.create(transaction, function(transaction){
					console.log('SUBMITTED TO QUEUE', transaction);
					lastSent = toSend;
				});
			} else if(lastSent == toSend){
				console.log("Already sent " + lastSent + " so not sending anything.");
			} else {
				lastSent = 0;
				console.log('clearing last payment');
			}
		}
	};

	Make.getReceivedByAddress(Make.getInfoByAddress);
	Make.getInfoByAddress(Make.check);

};