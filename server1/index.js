const express = require('express');
const cookieParser = require('cookie-parser');
const users = require('./users/users.js');
const products = require('./products/products.js');
const fs = require('fs');
// var multer = require('multer');
// var uploadFolder = multer({
// 	dest: 'uploads/'
// });

var app = express();

app.use(cookieParser());
app.use(express.static('./public'));
app.use('/users', users);
app.use('/products', products);

app.use('/*', (req, res, next) => {
	// console.log(req.cookies);
	next();
});
app.get('/template', (req, res) => {
	res.redirect('/indexTemplate.html');
	// console.log("get 1");
	// res.send("Hello!");
});
app.get('/', (req, res) => {
	res.redirect('/index.html');
	// console.log("get 1");
	// res.send("Hello!");
});

app.listen(3000);
console.log('Server started and port: 3000');