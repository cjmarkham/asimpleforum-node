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

	$(document).on('change', '#attachment-select input[type="file"]', function (e) {
		var files = e.target.files;

		for (var i=0; i<files.length; i++) {
			var file = files[i];

			var tr = $('<tr />');
			var td = $('<td />');
			td.text(file.name);
			tr.append(td);
			var td = $('<td />');
			td.text(Math.round(file.size / 1024) + 'Kb');
			tr.append(td);
			var td = $('<td />');
			td.text(file.type);
			tr.append(td);
			$('#file-list table tbody').append(tr);
		}

		if ($('#file-list').hasClass('hide')) {
			$('#file-list').removeClass('hide');
		}
	});

	$(document).on('click', '[data-event="click"]', ASF.events.call.bind(this));
	$(document).on('submit', '[data-event="submit"]', ASF.events.call.bind(this));
	$(document).on('keyup', '[data-event="keyup"]', ASF.events.call.bind(this));
	$(document).on('change', '[data-event="change"]', ASF.events.call.bind(this));
	$(document).on('keyup', '[data-event="return"]', function (e) {
		if (e.keyCode === 13) {
			return ASF.events.call(e);
		}
	});

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

	$(document).on('click', 'a:not(.external)', function (event) {

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
			var usernameDisplay = $('<a href="/user/' + username + '"><img alt="' + username + '" title="' + username + '" data-toggle="tooltip" id="' + username + '" src="/uploads/avatars/' + username + '/avatar.png" class="avatar tiny inline" /></a>');

			if (list == 0) {
				$('#online-list .content').empty();
			}

			if (!$('#online-list .content #' + username).length) {
				$('#online-list .content').append(usernameDisplay);
			}
		}

	});

	$(document).on('change', 'input[name="avatar"]', function (e) {

		var file = e.target.files[0];
		var imageType = /image*/;

		console.log(file);

		var fileReader = new FileReader();

		if (file.type.match(imageType)) {

			fileReader.onload = function () {

				var form = document.getElementById('avatar-form');
				var formData = new FormData(form);

				$.ajax({
					url: '/user/save/avatar',
					data: formData,
					processData: false,
					contentType: false,
					type: 'POST'
				}).done(function () {
					$('#avatar-list img').attr('src', fileReader.result);
				}).fail(function (response) {
					console.log(response);
					ASF.message.error(response.responseJSON.error);
					return false;
				});
			};

			fileReader.readAsDataURL(file); 
		} else {
			asf.error('File must be an image.');
		}
	});

});