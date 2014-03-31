var ExternalTransaction = function(config){
	this.amount = config.amount;
	this.currency = 'BTC';
	this.deposit = true;
	this.status = 'pending';
	this.external_account_id = config.external_account_id;
	this.ripple_transaction_id = config.ripple_transaction_id;
};
// ExternalTransaction.prototype.set : function(key, value){
// 	this[key] : value,
// };

module.exports = new ExternalTransaction();