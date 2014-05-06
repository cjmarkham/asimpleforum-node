$(function () {

	window.history.pushState({
		url: location.pathname
	}, null, location.pathname);

	window.addEventListener('popstate', function (event) {
		
		if (event.state == null) {
			return false;
		}

		console.log('popstateEvent', event.state);

		ASF.page.updateUrl = false;
		ASF.page.url = event.state.url;
		ASF.page.load();

	});

	$('.date').timeago();

	$('[data-toggle="tooltip"]').tooltip({
		placement: $(this).data('placement') || 'top'
	});

	var fileReader = new FileReader();

	$('input[name="avatar"]').on('change', function (e) {

		var file = e.target.files[0];
		var imageType = /image*/;

		var fileReader = new FileReader();

		if (file.type.match(imageType)) {

			fileReader.onload = function () {

				var form = document.getElementById('avatar-form');
				var formData = new FormData(form);

				$.ajax({
					url: '/user/save/avatar/',
					data: formData,
					processData: false,
					contentType: false,
					type: 'POST'
				}).done(function () {
					$('#avatar-list img').attr('src', fileReader.result);
				}).fail(function (response) {
					ASF.message.error(response.resposeText);
					return false;
				});
			};

			fileReader.readAsDataURL(file); 
		} else {
			ASF.message.error('File must be an image.');
		}
	});

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

	$(document).on('click', 'a', function (event) {

		event.preventDefault();

		console.log('Sending page request');

		ASF.page.request($(this).attr('href'));

		return;

	});

	socket.get('/session/list', function (users) {

		if (!users.length) {
			$('#online-list .content').text('No online users');
			return false;
		}

		for (var i in users) {
			
			var list = $('#online-list .content span').length;
			var username = users[i].username;
			var usernameDisplay = $('<img title="' + username + '" data-toggle="tooltip" id="' + username + '" class="avatar tiny inline" />').attr('src', '/uploads/avatars/' + username + '/avatar.png');

			if (list == 0) {
				$('#online-list .content').empty();
			}

			if (!$('#online-list .content #' + username).length) {
				$('#online-list .content').append(usernameDisplay);
			}
		}

	});

});