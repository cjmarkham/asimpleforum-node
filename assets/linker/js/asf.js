var ASF = {

	user: null,

	auth: {

		register: function (node) {
			
			var username = node.find('input[name="username"]').val().trim();
			var password = node.find('input[name="password"]').val().trim();
			var confirm  = node.find('input[name="confirm"]').val().trim();
			var email    = node.find('input[name="email"]').val().trim();

			$.post('/user/create', {
				username: username,
				password: password,
				confirm: confirm,
				email: email
			}).done(function (response) {

				window.location.href = '/';

			}).fail(function (response) {

				ASF.elements.removeLoader(node);

				return ASF.errors.parse(response);

			});

		},

		login: function (node) {

			var username = node.find('input[name="username"]').val().trim();
			var password = node.find('input[name="password"]').val().trim();

			socket.get('/session/create', {
				username: username,
				password: password
			}, function (response) {

				if (!response.error) {
					var params = {
						req: {
							session: {
								user: response,
								authenticated: true
							}
						}
					};

					ASF.elements.replace('#userbox', 'sidebars/userbox', params);
					ASF.elements.replace('#nav-quick-access', 'partials/user/navQuickAccess', params);
				} else {
					ASF.elements.removeLoader(node);

					return ASF.errors.parse(response);
				}

			});

		},

		logout: function (node) {
			socket.get('/session/destroy', function (response) {
				
				ASF.elements.replace('#userbox', 'sidebars/userbox');
				ASF.elements.replace('#nav-quick-access', 'partials/user/navQuickAccess');
			
			});
		}

	},

	elements: {

		addLoader: function (node) {
			var button = $(node).find('button.submit');

			button.attr('disabled', true);

			if (!button.length) {
				return false;
			}

			var loader = $('<em class="loader fa fa-spin fa-spinner" />');
			loader.insertAfter(button);
		},

		removeLoader: function (node) {
			var loader = $(node).find('.loader');

			if (!loader.length) {
				return false;
			}

			$(node).find('button.submit').removeAttr('disabled');

			loader.remove();
		},

		replace: function (target, element, params) {

			var loader = $('<em class="loader fa fa-spin fa-spinner" />');

			$(target).html(loader);

			$.post('/element', {
				element: element,
				params: params
			}).done(function (html) {
				$(target).html(html);
			});

		}

	},

	events: {

		call: function (event) {
			var node = event.target;
			var type = event.type;

			if (type === 'submit') {
				ASF.elements.addLoader(node);
			}

			var action = $(node).data('action');
			var method = ASF;

			var parts = action.split('.');

			if (parts.length === 1) {
				method = method[action];
			} else {
				for (var i in parts) {
					method = method[parts[i]];
				}
			}

			if (typeof method == 'function') {
				method($(node));
			} else {
				console.error('No such method ASF:' + action);
			}
		}

	},

	message: {

		error: function (string) {
			return ASF.message.alert(string, true);
		},

		alert: function (string, error) {
			var type = error ? 'danger' : 'info';

			var element = $('<div class="alert alert-' + type + '" />');
			element.html(string);

			$('#message-block').append(element);

			element.delay(5000).fadeOut(200, function() {
				this.remove();
			});

		}

	},

	errors: {

		highlightElement: function (element) {

			element = $('[name="' + element + '"]');
			element.css('position', 'relative');

			element.animate({
				backgroundColor: $.Color('#f2dede')
			}, 300, function () {
				element.animate({
					backgroundColor: $.Color('#fff')
				}, 300);
			});

			for (var x = 1; x <= 2; x++) {
				element.animate({
					left: (10 * -1)
				}, (200 / 2) / 4)
				.animate({
					left: 10
				}, (200 / 2) / 2)
				.animate({
					left:0
				}, (200 / 2) / 4);
			}

		},

		parse: function (response) {

			var errorStack = response.responseJSON.ValidationError;

			if (errorStack) {
				
				for (var element in errorStack) {

					ASF.errors.highlightElement(element);

					for (var index in errorStack[element]) {
						var rule = errorStack[element][index].rule;

						var messages = [];
						
						switch (rule) {
							case 'required':
								ASF.message.error(element + ' is a required field.');
								break;
							case 'email':
								ASF.message.error(element + ' must be a valid email.');
								break;
						}
					}

				}

			} else {
				errorStack = response.responseJSON.error;

				if (errorStack) {

					for (var i = 0; i < errorStack.length; i++) {
						ASF.message.error(errorStack[i]);
					}

				} else {
					ASF.message.error(response.responseJSON);
				}
			}

		}

	}

};