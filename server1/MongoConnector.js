var MongoClient = require('mongodb').MongoClient;
let dbName = 'shopDatabase';
class MongoConnector {

	constructor(callback) {
		this.url = 'mongodb://127.0.0.1:27017';
		this.conn = new MongoClient(this.url);
		this.connectionAvailable = false;
		this.client = null;
		this.conn.connect((err, client) => {
			this.connectionAvailable = true;
			this.client = client;
			callback(err);
		});
	}

	close() {
		this.client.close();
	}

	insertDocInCollection(col, fields, callback) {

		this.client.db(dbName).collection(col).insertOne(fields, callback);
	}

	/* { $set: {name: "Mickey", address: "Canyon 123" } };*/
	updateDocInCollection(col, fields, where, callback) {

		this.client.db(dbName).collection(col).updateOne(where, fields, callback);
	}

	getDocsFromCollection(col, where, callback) {

		this.client.db(dbName).collection(col).find(where).each(
			(err, doc) => {
				callback(doc);
			}
		);

	}

	/*
	getUser(uname, callback){
	     var i =0;
	 this.client.db(dbName).collection('users').find({'username':uname}).each( (err,doc)=> {
	     if( i == 0){
	        this.client.close();
	        callback(doc);
	        i++;
	     }
	} ); 
	 }
	 */

}

module.exports = MongoConnector;