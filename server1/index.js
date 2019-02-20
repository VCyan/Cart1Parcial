var express = require('express');
var cookieParser = require('cookie-parser');
var users = require('./users/users.js');
var products = require('./products/products.js');
var fs = require('fs');
var multer = require('multer');
var uploadFolder = multer({
	dest: 'uploads/'
});

var app = express();

app.use(cookieParser());
app.use(express.static('./public'));
app.use('/users', users);
app.use('/products', products);

app.use('/*', (req, res, next) => {
	// console.log(req.cookies);
	next();
});

app.get('/', (req, res) => {
	res.redirect('/index.html');
	// console.log("get 1");
	// res.send("Hello!");
});

app.listen(3030);
console.log('Server started and port: 3030');