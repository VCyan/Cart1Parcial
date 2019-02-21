var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var CartModel = require('./CartModel.js');
var Mongo = require('../MongoConnector.js')

router.get('/', jsonParser, (req,res,next) => {
  console.log("Get Carts Request");

  var connector = new Mongo( (err)=> {

    var str = '{"carts": [\n';

    CartModel.getCarts( connector, null, (doc,err)=> {
      //
      if (doc == null) {
        str = str.substring(0, str.length-2);
        str += '\n]}';
        res.end(str);
        connector.close();
      } else {
        str += JSON.stringify(doc);
        //str += '{"username":"'+doc.username+'", "password":"'+doc.password+'", "email":"'+doc.email+'", "photo":"'+doc.photo+'", "userType":'+doc.userType+'},\n';
      }
    })

  })
})

module.exports = router;
