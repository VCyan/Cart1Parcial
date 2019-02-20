const IP = 'http://10.25.251.166:3030';

$(document).ready(checkCookiesIN);

function checkCookiesIN() {
	// alert(document.cookie);
	if (typeof Cookies.get('token') === 'undefined') {
		// no cookie
		// No move!!! 
		// alert('Usuario no logueado...');
		// window.location.replace('./index.html');
	} else {
		// have cookie
		// Go to your page...
		if (parseInt(Cookies.get('userType')) === 1) {
			window.location.replace('./admin.html');
		} else {
			window.location.replace('./user.html');
		}
	}
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
			Cookies.set('username', obj['username'], {
				expires: 7,
				path: '/'
			});
			Cookies.set('token', obj['token'], {
				expires: 7,
				path: '/'
			});
			Cookies.set('userType', obj['userType'], {
				expires: 7,
				path: '/'
			});
			alert(document.cookie);
			if (parseInt(Cookies.get('userType')) === 1) {
				window.location.replace('./admin.html');
			} else {
				window.location.replace('./user.html');
			}
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