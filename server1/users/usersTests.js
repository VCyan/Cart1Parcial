var Mongo =require('../MongoConnector.js');
var User = require('./UserModel.js');

var user = new User({
        username:'jclira',
        password:'lira',
        email:'email@email.lira.com'
        });

var connector = new Mongo( (err)=>{

    User.insertUser(connector, 
        user,
        (err,res)=>{
            console.log(res.result);
            connector.close();
        }
    );
    console.log("Ready!! to go ");
} );
