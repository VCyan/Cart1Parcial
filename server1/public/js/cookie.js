const IP = 'http://10.25.251.166:3030';

// const USERS_ENDPOINT = '/api/v1/users/search_users';
// const PRODUCT_ENDPOINT = '/api/v1/events/search_events';

$(document).ready(checkCookies);

function checkCookies() {
	// alert(document.cookie);
	if (typeof Cookies.get('token') === 'undefined') {
		// no cookie
		alert('Usuario no logueado...');
		window.location.replace('./index.html');
	} else {
		// have cookie
		// Do nothing...
	}
}
/* 
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
} */