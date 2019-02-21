var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var UserModel = require('./UserModel.js');
var Mongo = require('../MongoConnector.js')

function validateCredentials(username, token){
  var valid = false;

  /*var connector = new Mongo( (err)=> {
    var where = '{username:"'+username+'", token:"'+token+'"}'
    console.log("Where: ", where);
    connector.getDocsFromCollection('sesions', where, (doc,err)=> {
      if(doc == null){
        return valid;
      } else {
        valid = true;
        console.log("Doc: ", doc);
        //return valid;
      }
    });
  });*/

  return true;
}

router.get('/', jsonParser, (req,res,next) => {
  //console.log("Get Users Request: ", req.body.username, req.body.token);
  if (validateCredentials(req.body.username, req.body.token)) {

    var connector = new Mongo( (err)=> {

      var str = '{"users": [\n';

      UserModel.getUsers( connector, null, (doc,err)=> {
        //
        if (doc == null) {
          str = str.substring(0, str.length-2);
          str += '\n]}';
          res.end(str);
          connector.close();
        } else {
          str += '{"username":"'+doc.username+'", "password":"'+doc.password+'", "email":"'+doc.email+'", "photo":"'+doc.photo+'", "userType":'+doc.userType+'},\n';
        }
      })

    })

  } else {
    res.send('Users Endpoint Unauthorized');
  }
});

router.post('/', jsonParser, (req,res,next) => {
  //console.log("Get Users Request: ", req.body);
  var user = new UserModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      photo: req.body.photo,
      userType: req.body.userType,
      state: req.body.state
  });

  var connector = new Mongo( (err)=>{

      UserModel.insertUser(connector,
          user,
          (err, mongoRes)=>{
              console.log(mongoRes.result);
              connector.close();
              res.end('{"state": "success"}');
          }
      );
      //console.log("Ready!! to go ");
  } );
})

router.put('/:username', jsonParser, (req,res,next) => {
  console.log("PUT Users Request: ", req.body);

  var connector = new Mongo( (err)=>{

      UserModel.updateUser(connector,
          {username:req.params.username},
          { $set: {username: req.body.username, password: req.body.password, email: req.body.email, photo: req.body.photo,} },
          (err, mongoRes)=>{
              console.log(mongoRes.result);
              connector.close();
              res.end('{"state": "success"}');
          }
      );
      //console.log("Ready!! to go ");
  } );
})

module.exports = router;
