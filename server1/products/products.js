// users handler
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const ProductModel = require('./ProductModel.js');
const router = express.Router();
const request = require('request');

var formUpload = multer({
	dest: './temp'
});

router.get('/', (req, res, next) => {
	res.send('Users hello');
});

router.post('/create',
	formUpload.fields(
		[{
			name: 'productName',
			maxCount: 1
		},
		{
			name: 'productPrice',
			maxCount: 1
		},
		{
			name: 'quantityProduct',
			maxCount: 1
		},
		{
			name: 'productDescription',
			maxCount: 1
		},
		{
			name: 'photoProduct',
			maxCount: 1
		}
		]
	),
	(req, res, next) => {
		console.log(req.body);
		console.log(req.files);

		var finalPhotoUrl = 'photos/products/' + req.body.productName + '/' + req.files['photoProduct'][0].originalname;

		if (!fs.existsSync('./public/photos/products/' + req.body.productName)) {
			fs.mkdirSync('./public/photos/products/' + req.body.productName);
		}

		fs.renameSync(req.files['photoProduct'][0].path, './public/' + finalPhotoUrl);

		let data_to_post = new ProductModel({
			productName: req.body.productName,
			productPrice: req.body.productPrice,
			quantityProduct: req.body.quantityProduct,
			productDescription: req.body.productDescription,
			photoProduct: finalPhotoUrl
		});

		console.log(data_to_post);

		// Perform ajax
		const IP = 'http://localhost:3030';
		var options = {
			method: 'POST',
			body: data_to_post,
			json: true,
			url: IP + '/products'
		};
		// console.log(options);

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

module.exports = router;