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

    CartModel.getCarts( connector, {}, (doc,err)=> {
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

router.get('/:username' , (req,res,next)=>{
    console.log("Get Cart Request Username=>" + req.params.username);

    var connector = new Mongo( (err)=> {

      var str = '';

      CartModel.getCarts( connector, {username:req.params.username}, (doc,err)=> {
        //
        if (doc == null) {
          res.end(str);
          connector.close();
        } else {
          str += JSON.stringify(doc);
          //str += '{"username":"'+doc.username+'", "password":"'+doc.password+'", "email":"'+doc.email+'", "photo":"'+doc.photo+'", "userType":'+doc.userType+'},\n';
        }
      })

    })
});

router.put('/:username', jsonParser, (req,res,next)=>{
    console.log("Put Product Cart Request Username=>" + req.body.username);

    var connector = new Mongo( (err)=> {

      var str = '';

      //CartModel.insertProduct( connector, {username:req.params.username}, {id:req.body.product_id,quantity:req.body.quantityProduct}, (doc,err)=> {
      CartModel.insertProduct( connector, {username:req.params.username}, {id:req.body.product_id,product_name:req.body.product_name,price:req.body.price,photo:req.body.photo, quantityProduct: req.body.quantityProduct}, (doc,err)=> {
        //
        if (doc == null) {
          res.end(str);
          connector.close();
        } else {
          str += JSON.stringify(doc);
          //str += '{"username":"'+doc.username+'", "password":"'+doc.password+'", "email":"'+doc.email+'", "photo":"'+doc.photo+'", "userType":'+doc.userType+'},\n';
        }
      })

    })
});

router.delete('/:username', jsonParser, (req,res,next)=>{
  console.log("DELETE Product Cart Request Username=>" + req.params.username);

  var connector = new Mongo( (err)=> {

    var str = '';

    CartModel.emptyCart( connector, {username:req.params.username}, (doc,err)=> {
      //
      if (doc == null) {
        res.end(str);
        connector.close();
      } else {
        str += JSON.stringify(doc);
      }
    })

  })
})

module.exports = router;
