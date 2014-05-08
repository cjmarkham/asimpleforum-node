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
		var usernameDisplay = $('<a href="/user/' + username + '"><img alt="' + username + '" title="' + username + '" data-toggle="tooltip" id="' + username + '" class="avatar tiny inline" src="/uploads/avatars/' + username + '/avatar.png" /></a>');

		if (list == 0) {
			$('#online-list .content').empty();
		}

		$('#online-list .content').append(usernameDisplay);

	} else {

		$('#online-list .content #' + username).remove();

		if (!$('#online-list .content span').length) {
			$('#online-list .content').text('No users online');
		}

	}
}

function topicMessageReceived (message) {

	if (message.verb === 'created') {

		$.post('/element', {
			element: 'partials/topic/single',
			params: message.data
		}).done(function (html) {
			$('#topics .content').prepend(html);
		});

	}

}