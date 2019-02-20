const IP = 'http://localhost:3030';

const USERS_ENDPOINT = '/api/v1/users/search_users';
const PRODUCT_ENDPOINT = '/api/v1/events/search_events';

// function pingDone(data) {
// 	//  alert("Data arrived:" + data);
// 	$('#main').html(data);
// 	// document.getElementById('main').innerHTML = data;
// }

// function onStart() {
// 	alert('loaded!');
// 	$.ajax('/ping').done(pingDone);
// }

// $(document).ready(onStart);


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

function getUsers() {
	$.ajax('/users/getUsers').done(data => {
		$('#allUsers').html(data);
	});
}

function doLogin() {
	// var data_to_send = JSON.stringify($('form.classLogin').serializeArray());
	var f_birthday = $('#usernameLogin').val();
	var f_location = $('#passwordLogin').val();
	var data_to_send = {
		'username': f_birthday,
		'password': f_location
	};
	// event.preventDefault();
	// 	// console.log($(this).serialize());
	// var data_to_send = JSON.stringify(data.serializeArray()); //  <-----------
	console.log(data_to_send);
	let settings = {
		'async': true,
		'crossDomain': true,
		'url': 'http://10.25.251.166:3030/sesions',
		'method': 'POST',
		'headers': {
			'Content-Type': 'application/json',
			'cache-control': 'no-cache',
		},
		
		'processData': false,
		'data': JSON.stringify(data_to_send)
	};

	/* 	{
			url: '10.25.251.166:3030/sesions',
			data: data_to_send,
			cache: false,
			contentType: 'application/json',
			processData: false,
			method: 'GET',
			type: 'GET' // For jQuery < 1.9 success: function(data) { alert('Did arrive ' + data);
		} */

	$.ajax(settings).done(response => {
		console.log(response);
		// Found?
		console.log(response);

		// if (response) {
		// 	window.location.replace('./userPage.html');
		// 	// redirect('/userPage.html');
		// }
		// UserType?
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

function setSettings(data) {
	let settings = {
		'async': true,
		'crossDomain': true,
		'url': IP + 'USERS_ENDPOINT',
		'method': 'POST',
		'headers': {
			'Content-Type': 'application/json',
			'cache-control': 'no-cache',
		},
		'processData': false,
		'data': JSON.stringify(data)
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

});