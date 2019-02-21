$.valHooks.textarea = {
	get: function (elem) {
		return elem.value.replace(/\r?\n/g, '\r\n');
	}
};

function doInsertUser() {
	var data = new FormData();
	data.append('username', $('#username')[0].value);
	data.append('password', $('#password')[0].value);
	data.append('email', $('#email')[0].value);
	data.append('photo', $('#photoFile')[0].files[0]);

	$.ajax({
		url: '/users/create/',
		data: data,
		cache: false,
		contentType: false,
		processData: false,
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (data) {
			// alert('Did arrive ' + data);
		}
	}).done(response => {
		console.log(response);
		let obj = $.parseJSON(response);
		if (obj['state'] === 'success') {
			// alert(obj['state']);
		}
	});
}

function doInsertProduct() {

	var text = $('textarea').val();
	// alert(text);

	var data = new FormData();
	data.append('productName', $('#productName')[0].value);
	data.append('productPrice', $('#productPrice')[0].value);
	data.append('quantityProduct', $('#quantityProduct')[0].value);
	data.append('productDescription', text);
	data.append('photoProduct', $('#photoProduct')[0].files[0]);
	// Display the key/value pairs
	// for (var pair of data.entries()) {
	// 	console.log(pair[0] + ', ' + pair[1]);
	// }
	$.ajax({
		url: '/products/create',
		data: data,
		cache: false,
		contentType: false,
		processData: false,
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (data) {
			// alert('Did arrive ' + data);
		}
	});
}

function getUsers() {
	var data_to_send = {
		username: Cookies.get('username'),
		token: Cookies.get('token')
	};
	console.log(data_to_send);

	let settings = {
		async: true,
		crossDomain: true,
		url: IP + '/users',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'cache-control': 'no-cache'
		},
		processData: false,
		data: JSON.stringify(data_to_send)
	};
	$.ajax(settings).done(response => {
		console.table(response);
		// console.log(response['state']);
		console.log(response);

		// response.users.forEach(function (element) {
		// 	// let obj = $.parseJSON(response);
		// 	var users = '';
		// 	var row = element.events;
		// 	while (condition) {
		// 		str = '<span>' + doc.username + '</span>' + '<img src="' + doc.photo + '">';
		// 	}
		// 	var events = '';
		// 	var eventos = element.events;
		// });


		$('#allUsers').html(response);
	});
}

function getTransactions() {
	var data_to_send = {
		username: Cookies.get('username'),
		token: Cookies.get('token')
	};
	console.log(data_to_send);

	let settings = {
		async: true,
		crossDomain: true,
		url: IP + '/transactions',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'cache-control': 'no-cache'
		},
		processData: false,
		data: JSON.stringify(data_to_send)
	};
	$.ajax(settings).done(response => {
		console.table(response);

		$('#allTransactions').html(response);
	});
}