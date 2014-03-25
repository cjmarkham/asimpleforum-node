var ASF = {

	user: null,

	globals: {
		forum: {}
	},

	utils: {
		toUrl: function (string) {
			return encodeURIComponent(string).replace(/%20/g, '-');
		}
	},

	profile: {

		updateViews: function (userId) {

			if (!userId) {
				return false;
			}

			$.post('/profile/updateViews', {
				userId: userId
			})
		},

		loadPostHistory: function (node, userId) {

			if (!userId) {
				userId = node.data('userid');
			}

			var offset = $('.profile-post').length;

			$.post('/profile/loadPostHistory', {
				userId: userId,
				offset: offset
			}).done(function (posts) {
				if (posts.length) {
					ASF.elements.append('#profile-post-history ul', '/partials/profile/posts', {posts: posts})

					if (posts.length < 6) {
						$('#loadMorePosts').remove();
					}
				} else {
					$('#loadMorePosts').remove();
				}
			});
		},

		loadComments: function (node, userId) {

			if (!userId) {
				userId = node.data('userid');
			}
			
			var offset = $('.profile-comment').length;

			$.post('/profile/loadComments', {
				userId: userId,
				offset: offset
			}).done(function (comments) {
				if (comments.length) {
					ASF.elements.append('#profile-comments ul', '/partials/profile/comments', {comments: comments})
				
					if (comments.length < 6) {
						$('#loadMoreComments').remove();
					}
				} else {
					$('#loadMoreComments').remove();
				}
			});

		}

	},

	forum: {

		loadMoreTopics: function (forumId, offset) {

			if ($('#no-topics').length) {
				return false;
			}

			$.post('/forum/moreTopics', {
				offset: offset,
				forumId: forumId
			}).done(function (topics) {
				
				if (topics.length) {
					ASF.elements.append('#topics .content', 'partials/topic/list', {topics: topics});
				
					var currentShowingAmount = parseInt($('#topic-count').text().trim(), 10);
					var newShowingAmount = currentShowingAmount + topics.length;

					$('#topic-count').text(newShowingAmount);

				} else {
					if (!$('#no-topics').length) {
						$('#topics .content').append($('<p id="no-topics" class="alert alert-warning" />').text('No more topics'));
					}
				}

			});

		}

	},

	topic: {

		create: function (node) {

			var nameElement = $('.title-edit:first');
			var contentElement = $('.post-content');

			if (nameElement.find('.placeholder').length || contentElement.find('.placeholder').length) {
				ASF.message.error('Please fill in all fields.');
				return false;
			}

			var name = nameElement.text().trim();
			var content = contentElement.text().trim();

			$.post('/topic/create', {
				name: name,
				content: content,
				forum: ASF.globals.forum.id
			}).done(function (response) {

				var urlPrefix = '/' + ASF.utils.toUrl(ASF.globals.forum.name) + '-' + ASF.globals.forum.id;
				var url = urlPrefix + '/' + ASF.utils.toUrl(response.topic.name) + '-' + response.topic.id;

				history.pushState({}, 'Title', url);
				ASF.page.load(url);

			}).fail(function (response) {
				ASF.elements.removeLoader(node);

				return ASF.errors.parse(response);
			});
		},

		newTrigger: function (node) {

			var urlPrefix = '/' + ASF.utils.toUrl(ASF.globals.forum.name) + '-' + ASF.globals.forum.id;

			history.pushState({}, 'Title', urlPrefix + '/new-topic');

			ASF.page.load(urlPrefix + '/new-topic');

		},

		updateName: function (node) {
			var name = node.text().trim();

			$('.title-edit').not(node).text(name);
		},

		loadMorePosts: function (topicId, offset) {

			if ($('#no-posts').length) {
				return false;
			}

			$.post('/topic/morePosts', {
				offset: offset,
				topicId: topicId
			}).done(function (posts) {
				
				if (posts.length) {
					ASF.elements.append('#post-list', 'partials/post/list', {posts: posts});
				} else {
					if (!$('#no-posts').length) {
						$('#post-list').append($('<p id="no-posts" class="alert alert-warning" />').text('No more posts'));
					}
				}

			});

		}

	},

	post: {

		create: function (node) {

		},

		newTrigger: function (node) {

			ASF.elements.append('#post-list', 'partials/post/single-blank');

			node.text('Save post').attr('data-action', 'post.create');

		}

	},

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
								User: response,
								authenticated: true
							}
						}
					};

					$('.hidden-no-user').show();
					$('.hidden-user').hide();

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

		},

		prepend: function (target, element, params) {

			$.post('/element', {
				element: element,
				params: params
			}).done(function (html) {
				$(target).prepend(html);
			});

		},

		append: function (target, element, params) {

			$.post('/element', {
				element: element,
				params: params
			}).done(function (html) {
				$(target).append(html);
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
				console.error('No such method ASF.' + action);
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

			if (response.responseJSON) {
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

			} else {
				ASF.message.error(response.responseText);
			}

		}

	},

	page: {
		load: function (url) {

			$.get(url).done(function (response) {
				$('#main-wrapper').hide().html(response).fadeIn(300);

				window.history.pushState({}, 'Title', url);
			});

		}
	}

};