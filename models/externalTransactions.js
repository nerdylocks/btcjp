var ExternalTransaction = function(config){
	this.amount = config.amount;
	this.currency = 'config.currency';
	this.deposit = config.deposit;
	this.external_account_id = config.external_account_id;
	this.status = 'pending';
	this.ripple_transaction_id = config.ripple_transaction_id;
};
ExternalTransaction.prototype.set = function(key, value){
	this[key] = value;
};

module.exports.ExternalTransaction;