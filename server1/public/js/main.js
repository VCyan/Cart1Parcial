
// $(document).ready(checkUser);

function checkUser() {
	// alert(document.cookie);
	if (typeof Cookies.get('token') === 'undefined') {
		// no cookie
		// alert('Usuario no logueado...');
		// window.location.replace('./index.html');
	} else {
		// have cookie
		if (parseInt(Cookies.get('userType')) === 1) {
			window.location.replace('./admin.html');
		} else {
			window.location.replace('./user.html');
		}
	}
}

function doLogout() {
	var data_to_send = {
		username: Cookies.get('username'),
		token: Cookies.get('token')
	};
	console.log(data_to_send);

	let settings = {
		async: true,
		crossDomain: true,
		url: IP + '/sesions',
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'cache-control': 'no-cache'
		},
		processData: false,
		data: JSON.stringify(data_to_send)
	};

	$.ajax(settings).done(response => {
		console.log(response);
		let obj = $.parseJSON(response);
		if (obj['state'] === 'success') {

			Cookies.remove('username', {
				path: '/'
			});
			Cookies.remove('token', {
				path: '/'
			});
			Cookies.remove('userType', {
				path: '/'
			});
			alert(document.cookie);

			window.location.replace('./index.html');
		} else {
			console.log('failonLogin');
		}
	});
}

// function setSettings(data) {
// 	let settings = {
// 		async: true,
// 		crossDomain: true,
// 		url: IP + 'USERS_ENDPOINT',
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'cache-control': 'no-cache'
// 		},
// 		processData: false,
// 		data: JSON.stringify(data)
// 	};
// 	return settings;
// }

// jQuery(document).ready(function ($) {
// 	// 'use strict';
// 	// $('form.classUser').on('submit', function (event) {
// 	// 	// event.preventDefault();
// 	// 	// console.log($(this).serialize());
// 	// 	var data_to_send = JSON.stringify($(this).serializeArray()); //  <-----------
// 	// 	// console.log(data_to_send);
// 	// 	var settings = {
// 	// 		'async': true,
// 	// 		'crossDomain': true,
// 	// 		'url': IP + '/users/create',
// 	// 		'method': 'POST',
// 	// 		'headers': {
// 	// 			'Content-Type': 'application/json',
// 	// 			'cache-control': 'no-cache',
// 	// 		},
// 	// 		'processData': false,
// 	// 		'data': data_to_send
// 	// 	};
// 	// 	$.ajax(settings).done(function (response) {
// 	// 		console.log(data_to_send);
// 	// 		console.log(response);
// 	// 	});
// 	// 	// https://stackoverflow.com/questions/1357118/event-preventdefault-vs-return-false
// 	// 	return false; // don't submit the form
// 	// });


// 	// function doUpload() {
// 	// 	var data = new FormData();
// 	// 	data.append('File1', $('#myFile')[0].files[0]);
// 	// 	$.ajax({
// 	// 		url: '/uploadFile',
// 	// 		data: data,
// 	// 		cache: false,
// 	// 		contentType: false,
// 	// 		processData: false,
// 	// 		method: 'POST',
// 	// 		type: 'POST', // For jQuery < 1.9
// 	// 		success: function (data) {
// 	// 			alert('Did arrive ' + data);
// 	// 		}
// 	// 	});
// 	// }
// 	/* 	{
// 			url: '10.25.251.166:3030/sesions',
// 			data: data_to_send,
// 			cache: false,
// 			contentType: 'application/json',
// 			processData: false,
// 			method: 'GET',
// 			type: 'GET' // For jQuery < 1.9 success: function(data) { alert('Did arrive ' + data);
// 		} */
// });