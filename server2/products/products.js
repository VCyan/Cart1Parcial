var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var ProductModel = require('./ProductModel.js');
var Mongo = require('../MongoConnector.js')

router.get('/', jsonParser, (req,res,next) => {
  console.log("Get Products Request");
  var connector = new Mongo( (err)=> {

    var str = '{"products": [\n';

    ProductModel.getProducts( connector, null, (doc,err)=> {
      //console.log("Doc-> ", doc);
      if (doc == null) {
        str = str.substring(0, str.length-2);
        str += '\n]}';
        res.end(str);
        connector.close();
      } else {
        str += '{"id":"'+doc._id+'","productName":"'+doc.productName+'", "productPrice":'+doc.productPrice+', "quantityProduct":'+doc.quantityProduct+', "productDescription":"'+doc.productDescription+'", "photoProduct":"'+doc.photoProduct+'"},\n';
      }
    })

  })
})

router.post('/', jsonParser, (req,res,next) => {
  console.log("Post Product Request: ", req.body.productName);

  var product = new ProductModel({
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      quantityProduct: req.body.quantityProduct,
      productDescription: req.body.productDescription,
      photoProduct: req.body.photoProduct
  });

  var connector = new Mongo( (err)=>{

      ProductModel.insertProduct(connector,
          product,
          (err, mongoRes)=>{
              console.log(mongoRes.result);
              connector.close();
              res.end('{"state": "success"}');
          }
      );
      //console.log("Ready!! to go ");
  });
});

module.exports = router;
