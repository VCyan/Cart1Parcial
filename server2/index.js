var express = require('express');
var cookieParser = require('cookie-parser');
var sesions = require('./sesions/sesions.js');

var app = express();

app.use( cookieParser() );
app.use('/sesions' , sesions);

app.use('/*' , (req,res,next)=>{
    console.log("Cookies: \n",  req.cookies);
    next();
});

/*app.get('/setCookie' , (req,res)=>{
    res.cookie('myCookie','data');
    res.end("cookie set");
});*/

app.listen(3030);
