var express = require('express');
var cookieParser = require('cookie-parser');
var sesions = require('./sesions/sesions.js');
var users = require('./users/users.js');
var products = require('./products/products.js');
var carts = require('./carts/carts.js');

var app = express();

// app.set('port', process.env.PORT || 3030);
// app.set('host', process.env.HOST || '10.25.251.166');

app.use(cookieParser());
app.use('/sesions', sesions);
app.use('/users', users);
app.use('/products', products);
app.use('/carts', carts);

/* app.use('/*' , (req,res,next)=>{
    console.log("Cookies: \n",  req.cookies);
    next();
});*/

/* app.get('/setCookie' , (req,res)=>{
    res.cookie('myCookie','data');
    res.end("cookie set");
});*/

// app.listen(3000, '0.0.0.0');
app.listen(3030);
console.log('Server started and port: 3030');

// app.listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('host') + ':' + app.get('port'));
// });
