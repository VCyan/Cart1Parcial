// users handler
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const UserModel = require('./UserModel.js');
const Mongo = require('../MongoConnector.js');
const router = express.Router();
const request = require('request');

var formUpload = multer({
	dest: './temp'
});

router.get('/', (req, res, next) => {
	res.send('Users hello');
});

/* router.get('/getUsers', (req, res, next) => {
	console.log('getting');
	var str = '';
	var connector = new Mongo((err) => {
		UserModel.getUsers(connector, null, (doc, err) => {
			console.log(doc);
			console.log(err);

			if (doc == null) {
				res.end(str);
				connector.close();
			} else {
				str = '<span>' + doc.username + '</span>' + '<img src="' + doc.photo + '">';
			}
		});
		console.log('Ready!! to go ');
	});
});

router.get('/loginUser', (req, res, next) => {
	var str = '';
	var connector = new Mongo((err) => {
		UserModel.getUser(connector, 'VCyan', (doc, err) => {

			if (doc == null) {
				res.end(str);
				connector.close();
			} else {
				console.log(doc);
			}
		});
		// console.log('Ready!! to go ');
	});
}); */
/*
 console.log(req.files["File1"][0]);
    
     fs.renameSync(req.files["File1"][0].path , "./uploads/"+req.files["File1"][0].originalname );
    res.end('done');*/

router.post('/create',
	formUpload.fields(
		[{
			name: 'username',
			maxCount: 1
		},
		{
			name: 'password',
			maxCount: 1
		},
		{
			name: 'email',
			maxCount: 1
		},
		{
			name: 'photo',
			maxCount: 1
		}
		]
	),
	(req, res, next) => {
		console.log(req.body);
		console.log(req.files);

		// var finalPhotoUrl = 'photos/users/' + req.body.username + '/' + req.files['photo'][0].originalname;
		var finalPhotoUrl = 'photos/users/' + req.body.username + '/' + req.files['photo'][0].originalname;

		if (!fs.existsSync('./public/photos/users/' + req.body.username)) {
			fs.mkdirSync('./public/photos/users/' + req.body.username);
		}

		fs.renameSync(req.files['photo'][0].path, './public/' + finalPhotoUrl);

		let data_to_post = new UserModel({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			photo: finalPhotoUrl
		});

		// Perform ajax

		const IP = 'http://localhost:3030';
		var options = {
			method: 'POST',
			body: data_to_post,
			json: true,
			url: IP + '/users'
		};
		
		request(options, function (err, res, body) {
			if (err) {
				console.error('error posting json: ', err);
				throw err;
			}
			var headers = res.headers;
			var statusCode = res.statusCode;
			// console.log('headers: ', headers);
			// console.log('statusCode: ', statusCode);
			// console.log('body: ', body);
			let state = body.state;
			console.log(state);
		});
	}
);

router.put('/update',
	formUpload.fields(
		[{
			name: 'usernameCookie',
			maxCount: 1
		}
		,
		{
			name: 'tokenCookie',
			maxCount: 1
		},
		{
			name: 'password',
			maxCount: 1
		},
		{
			name: 'password',
			maxCount: 1
		},
		{
			name: 'email',
			maxCount: 1
		},
		{
			name: 'photo',
			maxCount: 1
		}
		]
	),
	(req, res, next) => {
		console.log(req.body);
		console.log(req.files);

		// var finalPhotoUrl = 'photos/users/' + req.body.username + '/' + req.files['photo'][0].originalname;
		var finalPhotoUrl = 'photos/users/' + req.body.username + '/' + (req.files['photo'][0].originalname).split;

		if (!fs.existsSync('./public/photos/users/' + req.body.username)) {
			fs.mkdirSync('./public/photos/users/' + req.body.username);
		}

		fs.renameSync(req.files['photo'][0].path, './public/' + finalPhotoUrl);

		// let data_to_post = new UserModel({
		// 	username: req.body.username,
		// 	password: req.body.password,
		// 	email: req.body.email,
		// 	photo: finalPhotoUrl
		// });
		let data_to_post = {
			usernameCookie: req.body.usernameCookie,
			tokenCookie: req.body.tokenCookie,
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			photo: finalPhotoUrl
		};

		// Perform ajax

		const IP = 'http://localhost:3030';
		var options = {
			method: 'PUT',
			body: data_to_post,
			json: true,
			url: IP + '/users'
		};

		console.log(options);
		
		/* request(options, function (err, res, body) {
			if (err) {
				console.error('error posting json: ', err);
				throw err;
			}
			var headers = res.headers;
			var statusCode = res.statusCode;
			// console.log('headers: ', headers);
			// console.log('statusCode: ', statusCode);
			// console.log('body: ', body);
			let state = body.state;
			console.log(state);
		}); */
	}
);

module.exports = router;