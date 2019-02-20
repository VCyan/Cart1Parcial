// users handler
var fs = require('fs');
var express = require('express');
var multer = require('multer');
var ProductModel = require('./ProductModel.js');
var Mongo = require('../MongoConnector.js');
var router = express.Router();


var formUpload = multer({
	dest: './temp'
});

router.get('/', (req, res, next) => {
	res.send('Users hello');

});

router.get('/getUsers', (req, res, next) => {
	console.log('getting');
	var str = '';
	var connector = new Mongo((err) => {
		ProductModel.getUsers(connector, null, (doc, err) => {
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
		ProductModel.getUser(connector, 'VCyan', (doc, err) => {

			if (doc == null) {
				res.end(str);
				connector.close();
			} else {
				console.log(doc);
			}
		});
		// console.log('Ready!! to go ');
	});
});
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


		var finalPhotoUrl = 'photos/' + req.body.username + '/' + req.files['photo'][0].originalname;

		if (!fs.existsSync('./public/photos/' + req.body.username)) {
			fs.mkdirSync('./public/photos/' + req.body.username);
		}

		fs.renameSync(req.files['photo'][0].path, './public/' + finalPhotoUrl);


		var user = new ProductModel({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			photo: finalPhotoUrl
		});

		var connector = new Mongo((err) => {

			ProductModel.insertUser(connector,
				user,
				(err, mongoRes) => {
					console.log(mongoRes.result);
					connector.close();
					res.end('done user create');
				}
			);
			console.log('Ready!! to go ');
		});

	}
);

router.get('/profile/:id/edit', (req, res) => {
	console.log('profile id=>' + req.params.id);
	res.send('Id reached : ' + req.params.id);
});


module.exports = router;