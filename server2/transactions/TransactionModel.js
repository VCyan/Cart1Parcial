class TransactionModel {
  constructor(data) {
    this.id = data._id;
    this.username = data.username;
    this.amount = data.amount;
  }

  /*
  connector: mongo db connection
  transactionModel: data for where clause
  callback: function to call EACH time a record is found
  */
  static getTransactions(connector, transactionModel, callback){

      connector.getDocsFromCollection('transactions', {}, callback);
  }
}

module.exports = TransactionModel;
