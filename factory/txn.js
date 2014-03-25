exports.parseTxn = function(){
	
	var Transaction = function(options){
        this.address = options.address;
        this.total_received = options.total_received;
        this.time_stamp = new Date(options.time_stamp);
    };

    return Transaction;
}