const fs = require('fs');

const express = require('express');
const cookieParser = require('cookie-parser');

const multer = require('multer');
const uploadFolder = multer({
	dest: 'uploads/'
});

const users = require('./users/users.js');

const app = express();

// La habilidad de enviar a la misma ruta los get 2, get 1.
// app.get('/', (req, res, next) => {
// 	console.log('get 2');
// 	// res.send('Hello2');
// 	// res.end()
// 	next();
// });
app.use(cookieParser());
app.use(express.static('./public_html'));
app.use('/users', users);
// Lo normal es usar use, pero igual puedes usar all
app.use('/*', (req, res, next) => {
	console.log(req.cookies);
	next();
});

app.post('/uploadFile', uploadFolder.single('File1'), (req, res, next) => {
	fs.renameSync(req.file.path, req.file.destination + req.file.originalname);

	console.log(req.file);
	res.end('Done');
});

app.get('/setCookie', (req, res) => {
	res.cookie('myCookie:', 'data');
	// IMPORTANTE: Porque es el que hace el set.
	res.end('cookie set');
});

app.get('/ping', (req, res) => {
	// res.set('Content-type','text/plain');
	res.set('Content-type', 'text/html');
	res.send('<div>pong</div>');
	res.end();
});

app.get('/', (req, res) => {
	res.redirect('/index.html');
	// console.log('get 1');
	// res.send('Hello!');
});

app.listen(3030);
console.log('Server started and port: 3030');

// Server 1
// Login
// Single Page
// - Admin
// 	Add products, dar, ver transacc del checkout sin reload boton relaod, edit user. 
// User: cart-CRUD, cehckout., edit

// User no image.
// Admin guardar images donde quieras.

// Server2 
// Aceptar conexiones de ese solo unico server.
// 

// Mongo: 
// Users.
// Transactions
// CART
// Products.