var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var TransactionModel = require('./TransactionModel.js');
var Mongo = require('../MongoConnector.js')

router.get('/', jsonParser, (req,res,next) => {
  console.log("Get Transactions Request");
  //res.end("Get Transactions Request");
  var connector = new Mongo( (err)=> {

    var str = '{"transactions": [\n';

    TransactionModel.getTransactions( connector, {}, (doc,err)=> {
      //
      if (doc == null) {
        str = str.substring(0, str.length-2);
        str += '\n]}';
        res.end(str);
        connector.close();
      } else {
        str += JSON.stringify(doc)+',\n';
        //str += '{"username":"'+doc.username+'", "password":"'+doc.password+'", "email":"'+doc.email+'", "photo":"'+doc.photo+'", "userType":'+doc.userType+'},\n';
      }
    })

  })
})

module.exports = router;
