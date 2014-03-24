/**
 * app.js
 */

(function (io) {

	var socket = io.connect();

	socket.on('connect', function socketConnected() {

		socket.on('user', userMessageReceived);
		socket.on('topic', topicMessageReceived);

		socket.get('/user/subscribe');

	});

	window.socket = socket;

	function log () {
		if (typeof console !== 'undefined') {
			console.log.apply(console, arguments);
		}
	}


})(window.io);

function userMessageReceived (message) {
	
	var username = message.data.username;

	if (message.data.loggedIn) {

		var list = $('#online-list .content span').length;

		if (list > 0) {
			username = ', ' + username;
		} else {
			$('#online-list .content').empty();
		}

		$('#online-list .content').append('<span id="' + username + '">' + username + '</span>');

	} else {

		$('#online-list .content #' + username).remove();

		if (!$('#online-list .content span').length) {
			$('#online-list .content').text('No users online');
		}

	}
}

function topicMessageReceived (message) {

	console.log(message.data);
	
	if (message.verb === 'created') {

		$.post('/element', {
			element: 'partials/topic/single',
			params: message.data
		}).done(function (html) {
			$('#topics .content').prepend(html);
		});

	}

}