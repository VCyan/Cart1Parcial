var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var UserPModel = require('./UserPModel.js');
var Mongo = require('../MongoConnector.js')

router.get('/', (req,res,next) => {
   res.send('Sesion Endpoint');
});

router.post('/', jsonParser, (req,res,next) => {
  console.log("Post Request to Sesion Endpoint: ", req.body.username, req.body.password);

  console.log("Authenticating");

  var str = "";
  var connector = new Mongo( (err)=>{

      UserPModel.getUsers(connector, req.body, (doc,err) => {

          //console.log(doc);
          //console.log(err);
          console.log(req.body);

          if( doc == null){
              res.end(str);
              connector.close();
          }else{
              str = '<span>'+doc.username+'</span>' + '<img src="'+doc.photo+'">'
          }
      });

      console.log("Ready!! to go ");
  } );
});

module.exports = router;
