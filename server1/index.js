var express = require('express');
var cookieParser = require('cookie-parser');
var users = require('./users/users.js');
var fs = require('fs');
var multer = require('multer');
var uploadFolder = multer({
	dest: 'uploads/'
});

var app = express();

app.use(cookieParser());
app.use(express.static('./public'));
app.use('/users', users);

app.use('/*', (req, res, next) => {
	console.log(req.cookies);
	next();
});

app.post('/uploadFile', uploadFolder.single('File1'), (req, res, next) => {

	fs.renameSync(req.file.path, req.file.destination + req.file.originalname);

	console.log(req.file);
	res.end('done');
});

app.get('/setCookie', (req, res) => {
	res.cookie('myCookie', 'data');
	res.end('cookie set');
});

app.get('/ping', (req, res) => {
	res.set('Content-type', 'text/html');
	res.send('<div>Pong</div>');
	res.end();
});

app.get('/', (req, res) => {
	res.redirect('/index.html');
	// console.log("get 1");
	// res.send("Hello!");
});

app.listen(3030);