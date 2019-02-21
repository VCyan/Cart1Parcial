/* eslint-disable no-undef */
// $(document).ready(getUser);
$(document).ready(function () {
	getProducts();
	// getCart(); 
	// Understanding Event Delegation
	// https://learn.jquery.com/events/event-delegation/
	$('#tableProducts').on('change', 'select.selectedQty', addtoCart);
	$('#tableCart').on('click', 'button.deleteQty', deletetoCart);
});

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
		url: IP + '/users/' + Cookies.get('username'),
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

function getProducts() {
	// let data_to_receive = '';
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
		let obj = $.parseJSON(response);
		console.log(obj['products']);
		// if (obj['state'] === 'success')
		// data_to_receive = response;
		if (obj['products'].length > 0) {
			obj['products'].forEach(function (element) {
				// var img = `< img id='${element['id ']} src="./${element['photoProduct']}"	alt="" width = "50px" >`
				// img.setAttribute('id', element['id']);
				// img.setAttribute('src', './' + element['photoProduct']);
				// img.setAttribute('width', '50px');

				// img.set({
				// 	'id': ,
				// 	'src': './' + element['photoProduct'],
				// 	'alt': 'product image',
				// 	'title': 'nasty logo',
				// 	'width': 50
				// });
				let optionQty = '';
				for (let index = 0; index <= parseInt(element.quantityProduct); index++) {
					optionQty = optionQty + '<option value="' + index + '">' + index + '</option>';
				}
				var row =
					// '<tr><td>< img id='+ element['id ']+'src="./'+element['photoProduct']+'"	width = "50px"></td>' +
					'<tr><td><img src="./' + element.photoProduct + '" height="150px" width="150px"></td>' +
					'<td>' + element.productName + '</td>' +
					'<td>' + element.productDescription + '</td>' +
					'<td>$' + element.productPrice + '</td> ' +
					'<td>' + element.quantityProduct + '</td>' +
					'<td><select class="selectedQty"  data-id="' + element.id + '">' + optionQty + '</select></td></tr>';
				// '<td>' + element.photoProduct + '</td></tr>';
				$('#allProducts').append(row);
			});
		}
		// $('#allProducts').html(response);
	});
}

function addtoCart() {
	// var confirmation = confirm('Are you sure');
	if (parseInt($(this).children('option:selected').val()) !== 0) {
		let data_to_send = {
			username: Cookies.get('username'),
			token: Cookies.get('token'),
			product_id: $(this).data('id'),
			quantityProduct: $(this).children('option:selected').val()
		};
		let settings = {
			async: true,
			crossDomain: true,
			url: IP + '/carts/' + Cookies.get('username'),
			method: 'PUT',
			type: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'cache-control': 'no-cache'
			},
			processData: false,
			data: JSON.stringify(data_to_send)
		};

		console.log(settings);

		$.ajax(settings).done(
			// getCart()
			response => {
				console.log(response);
				let obj = $.parseJSON(response);
				if (obj['state'] === 'success') {
					// alert(obj['state']);
				}
			}
		);
	}
}

function deletetoCart() {
	var confirmation = confirm('Are you sure to delete this item from your cart?');
	if (confirmation) {
		let data_to_send = {
			username: Cookies.get('username'),
			token: Cookies.get('token'),
			product_id: $(this).data('id')
			// ,
			// quantityProduct: $(this).children('option:selected').val()
		};
		let settings = {
			async: true,
			crossDomain: true,
			url: IP + '/carts/' + Cookies.get('username'),
			method: 'DELETE',
			type: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'cache-control': 'no-cache'
			},
			processData: false,
			data: JSON.stringify(data_to_send)
		};

		// console.log(settings);

		// $.ajax(settings).done(
		// 	// getCart()
		// 	response => {
		// 		console.log(response);
		// 		let obj = $.parseJSON(response);
		// 		if (obj['state'] === 'success') {
		// 			// alert(obj['state']);
		// 		}
		// 	}
		// );
	}
}

function getCart() {
	var data_to_send = {
		username: Cookies.get('username'),
		token: Cookies.get('token')
	};
	console.log(data_to_send);

	let settings = {
		async: true,
		crossDomain: true,
		url: IP + '/carts/' + Cookies.get('username'),
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
		// DAME un state
		console.log(response);
		let obj = $.parseJSON(response);
		console.log(obj['products']);
		let totalSum = 0;
		if (obj['products'].length > 0) {
			obj['products'].forEach(function (element) {
				let cost = (parseInt(element.productPrice) * parseInt(element.quantityProduct));
				totalSum = totalSum + cost;
				// for (let index = 0; index <= parseInt(element.quantityProduct); index++) {
				// 	optionQty = optionQty + '<option value="' + index + '">' + index + '</option>';
				// }
				var row =
					'<tr><td><img src="./' + element.photoProduct + '" height="150px" width="150px"></td>' +
					'<td>' + element.productName + '</td>' +
					'<td>$' + element.productPrice + '</td> ' +
					'<td>' + element.quantityProduct + '</td>' +
					'<td>$' + cost + '</td>' +
					'<td><button class="deleteQty"  data-id="' + element.id + '">Quitar</button></tr>';
				// '<td>' + element.photoProduct + '</td></tr>';
				$('#allCart').append(row);
			});

			let totalCost = '<tr><td colspan="3">Amount:</td><td colspan="3">' + totalSum + '</td></tr>';
			$('#allCart').append(totalCost);
			$("#checkout").val(totalCost);
		}
	});
}

function resetCart() {
	var data_to_send = {
		username: Cookies.get('username'),
		token: Cookies.get('token')
	};
	console.log(data_to_send);

	let settings = {
		async: true,
		crossDomain: true,
		url: IP + '/carts/' + Cookies.get('username'),
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
		$("#allCart").empty();
	});
}

function doCheckout() {
	var amount = parseInt($(this).val());
	var data_to_send = {
		username: Cookies.get('username'),
		token: Cookies.get('token'),
		amount: amount
	};
	$.ajax({
		url: '/transactions/' + Cookies.get('username'),
		data: data,
		cache: false,
		contentType: false,
		processData: false,
		method: 'POST',
		type: 'POST', // For jQuery < 1.9
		success: function (data) {
			// alert('Did arrive ' + data);
		}
	}).done(
		// Do reset of carrito???
		response => {
			console.log(response);
			let obj = $.parseJSON(response);
			if (obj['state'] === 'success') {
				// alert(obj['state']);
			}
		}
	);
}