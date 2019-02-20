var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var UserPModel = require('./UserPModel.js');
var SesionModel = require('./SesionModel.js');
var Mongo = require('../MongoConnector.js')

function generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

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
          console.log("Recieved: ", req.body);

          if( doc == null ){
              res.end('{"state": "fail"}');
              connector.close();
          }else{
              //str = '<span>'+doc.username+'</span>' + '<img src="'+doc.photo+'">'
              var token = generate_token(10);
              var sesion = new SesionModel({
                  username: doc.username,
                  token: token
                  });

              SesionModel.insertSesion(connector,
                  sesion,
                  (err, mongoRes)=>{
                      //console.log(mongoRes.result);
                      //connector.close();
                      //res.end('done user create');
                  }
              );

              str = '{"state":"success", "username":"'+doc.username+'", "token":"'+token+'", "userType":'+doc.userType+'}';
              res.end(str);
              connector.close();
          }
      });

      console.log("Ready!! to go ");
  } );
});

module.exports = router;
