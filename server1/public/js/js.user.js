$(document).ready(getUser);

function getUser() {
	let data_to_receive = '';
	let data_to_send = {
		username: Cookies.get('username'),
		token: Cookies.get('token')
	};
	console.log(Cookies.get('username'));

	let settings = {
		async: true,
		crossDomain: true,
		url: IP + '/users/' +: id,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'cache-control': 'no-cache'
		},
		processData: false,
		data: JSON.stringify(data_to_send)
	};
	$.ajax(settings).done(response => {
		console.log(response);
		data_to_receive = response;
	});

	// $('#allProducts').html(data_to_receive);
}

function doEditUser() {
	// let data_to_receive = '';
	// let data_to_send = {
	// 	username: Cookies.get('username'),
	// 	token: Cookies.get('token')
	// };
	// console.log(Cookies.get('username'));


	var data = new FormData();

	data.append('usernameCookie', Cookies.get('username'));
	data.append('tokenCookie', Cookies.get('token'));

	data.append('username', $('#username')[0].value);
	data.append('password', $('#password')[0].value);
	data.append('email', $('#email')[0].value);
	data.append('photo', $('#photoFile')[0].files[0]);
	// Display the key/value pairs
	for (var pair of data.entries()) {
		console.log(pair[0] + ', ' + pair[1]);
	}
	$.ajax({
		url: '/users/update/',
		data: data,
		cache: false,
		contentType: false,
		processData: false,
		method: 'PUT',
		type: 'PUT', // For jQuery < 1.9
		success: function (data) {
			alert('Did arrive ' + data);
		}
	}).done(response => {
		console.log(response);
		let obj = $.parseJSON(response);
		if (obj['state'] === 'success') {
			alert(obj['state']);
		}
	});
}

function getProducts() {
	let data_to_receive = '';
	let data_to_send = {
		username: Cookies.get('username'),
		token: Cookies.get('token')
	};
	console.log(data_to_send);

	let settings = {
		async: true,
		crossDomain: true,
		url: IP + '/products',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'cache-control': 'no-cache'
		},
		processData: false,
		data: JSON.stringify(data_to_send)
	};
	$.ajax(settings).done(response => {
		console.log(response);
		data_to_receive = response;
	});

	$('#allProducts').html(data_to_receive);
}