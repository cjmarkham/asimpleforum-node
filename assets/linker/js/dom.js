$(function () {

	var guests = users = 0;

	if (!ASF.globals.user) {
		$('.hidden-no-user').hide();
	} else {
		$('.hidden-user').hide();
	}

	$(document).on('click', '[data-event="click"]', ASF.events.call.bind(this));
	$(document).on('submit', '[data-event="submit"]', ASF.events.call.bind(this));
	$(document).on('keyup', '[data-event="keyup"]', ASF.events.call.bind(this));
	$(document).on('change', '[data-event="change"]', ASF.events.call.bind(this));

	socket.on('connect', function () {
		
	});

	socket.on('disconnect', function () {
		
	});

	$(document).on('click', '[contenteditable]', function () {
		if ($(this).find('.placeholder').length) {
			$(this).empty();
		}
	});

	$(document).on('blur', '[contenteditable]', function () {
		if (!$(this).find('.placeholder').length && $(this).text().length == 0) {
			$(this).html($('<span class="placeholder" />').text($(this).attr('data-placeholder')));
		}
	});

	$('a').on('click', function (event) {

		if (!$(this).attr('href').match('http')) {
			event.preventDefault();

			ASF.page.load($(this).attr('href'));
		}

	});

	socket.get('/session/list', function (users) {

		if (!users) {
			$('#online-list .content').text('No online users');
			return false;
		}

		for (var i in users) {
			
			var list = $('#online-list .content span').length;
			var username = users[i].username;
			var usernameDisplay = username;

			if (list > 0) {
				usernameDisplay = ', ' + username;
			} else {
				$('#online-list .content').empty();
			}

			if (!$('#online-list .content #' + username).length) {
				$('#online-list .content').append('<span id="' + username + '">' + usernameDisplay + '</span>');
			}
		}

	});

});