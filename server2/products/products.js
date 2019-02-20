var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var ProductModel = require('./ProductModel.js');
var Mongo = require('../MongoConnector.js')

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
