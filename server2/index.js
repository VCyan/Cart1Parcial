var express = require('express');
var cookieParser = require('cookie-parser');
var sesions = require('./sesions/sesions.js');
var users = require('./users/users.js');
var products = require('./products/products.js');
var carts = require('./carts/carts.js');
var transactions = require('./transactions/transactions.js');

var app = express();

// app.set('port', process.env.PORT || 3030);
// app.set('host', process.env.HOST || '10.25.251.166');

app.use(cookieParser());

app.use('/*' , (req,res,next)=>{
    var ip = req.connection.remoteAddress;
    console.log("Request from: ",  ip);

    if (ip == '10.25.244.172' || ip == '10.25.254.156' || ip == '127.0.0.1') {
      next();
    } else {
      res.end('Unauthorized');
    }
});

app.use('/sesions', sesions);
app.use('/users', users);
app.use('/products', products);
app.use('/carts', carts);
app.use('/transactions', transactions);

app.listen(3030, '0.0.0.0');
// app.listen(3030);
console.log('Server started and port: 3030');

// app.listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('host') + ':' + app.get('port'));
// });
