const IP = 'http://10.25.251.166:3030';

// const USERS_ENDPOINT = '/api/v1/users/search_users';
// const PRODUCT_ENDPOINT = '/api/v1/events/search_events';

function listCookies() {
	var theCookies = document.cookie.split(';');
	var aString = '';
	for (var i = 1; i <= theCookies.length; i++) {
		aString += i + ' ' + theCookies[i - 1] + '\n';
	}
	return aString;
}

function setCookie(name, value, days) {
	var expires = '';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function eraseCookie(name) {
	document.cookie = name + '=; Max-Age=-99999999;';
}

function doLogin() {
	// var data_to_send = JSON.stringify($('form.classLogin').serializeArray());
	var v_user = $('#usernameLogin').val();
	var v_pass = $('#passwordLogin').val();
	var data_to_send = {
		username: v_user,
		password: v_pass
	};
	// event.preventDefault();
	// 	// console.log($(this).serialize());
	// var data_to_send = JSON.stringify(data.serializeArray()); //  <-----------
	console.log(data_to_send);

	let settings = {
		async: true,
		crossDomain: true,
		url: IP + '/sesions',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'cache-control': 'no-cache'
		},
		processData: false,
		data: JSON.stringify(data_to_send)
	};

	$.ajax(settings).done(response => {
		console.log(response);
		// Found?
		console.log(response['state']);
		let obj = $.parseJSON(response);
		if (obj['state'] === 'success') {
			// redirect('/userPage.html');
			// document.cookie = 'username=' + response.username;
			// document.cookie = 'token=' + response.token;
			setCookie('username', obj['username'], 7);
			setCookie('token', obj['token'], 7);
			setCookie('userType', obj['userType'], 7);
			// alert(document.cookie);
			if (parseInt(getCookie('userType')) === 0) {
				window.location.replace('./admin.html');
			} else {
				window.location.replace('./user.html');
			}
		} else {
			console.log('failonLogin');
		}
	});
}

function doLogout() {
	var data_to_send = {
		username: getCookie('username'),
		token: getCookie('token')
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

			eraseCookie('username');
			eraseCookie('token');
			eraseCookie('userType');
			alert(document.cookie);

			window.location.replace('./index.html');
		} else {
			console.log('failonLogin');
		}
	});
}

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
			alert('Did arrive ' + data);
		}
	});
}

function doInsertProduct() {
	var data = new FormData();
	data.append('productName', $('#productName')[0].value);
	data.append('productPrice', $('#productPrice')[0].value);
	data.append('quantityProduct', $('#quantityProduct')[0].value);
	data.append('productDescription', $('#productDescription')[0].value);
	data.append('photoProduct', $('#photoProduct')[0].files[0]);

	$.ajax({
		url: '/products/create/',
		data: data,
		cache: false,
		contentType: false,
		processData: false,
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (data) {
			alert('Did arrive ' + data);
		}
	});
}

function getUsers() {
	$.ajax('/users/getUsers').done(data => {
		$('#allUsers').html(data);
	});
}

function setSettings(data) {
	let settings = {
		async: true,
		crossDomain: true,
		url: IP + 'USERS_ENDPOINT',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'cache-control': 'no-cache'
		},
		processData: false,
		data: JSON.stringify(data)
	};
	return settings;
}

jQuery(document).ready(function ($) {
	// 'use strict';
	// $('form.classUser').on('submit', function (event) {
	// 	// event.preventDefault();
	// 	// console.log($(this).serialize());
	// 	var data_to_send = JSON.stringify($(this).serializeArray()); //  <-----------
	// 	// console.log(data_to_send);
	// 	var settings = {
	// 		'async': true,
	// 		'crossDomain': true,
	// 		'url': IP + '/users/create',
	// 		'method': 'POST',
	// 		'headers': {
	// 			'Content-Type': 'application/json',
	// 			'cache-control': 'no-cache',
	// 		},
	// 		'processData': false,
	// 		'data': data_to_send
	// 	};
	// 	$.ajax(settings).done(function (response) {
	// 		console.log(data_to_send);
	// 		console.log(response);
	// 	});
	// 	// https://stackoverflow.com/questions/1357118/event-preventdefault-vs-return-false
	// 	return false; // don't submit the form
	// });


	// function doUpload() {
	// 	var data = new FormData();
	// 	data.append('File1', $('#myFile')[0].files[0]);
	// 	$.ajax({
	// 		url: '/uploadFile',
	// 		data: data,
	// 		cache: false,
	// 		contentType: false,
	// 		processData: false,
	// 		method: 'POST',
	// 		type: 'POST', // For jQuery < 1.9
	// 		success: function (data) {
	// 			alert('Did arrive ' + data);
	// 		}
	// 	});
	// }
	/* 	{
			url: '10.25.251.166:3030/sesions',
			data: data_to_send,
			cache: false,
			contentType: 'application/json',
			processData: false,
			method: 'GET',
			type: 'GET' // For jQuery < 1.9 success: function(data) { alert('Did arrive ' + data);
		} */
});