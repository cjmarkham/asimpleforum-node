var ASF = {

	user: null,

	globals: {
		forum: {}
	},

	search: function (node) {
		var query = node.find('input[name="query"]').val();

		node.find('input[name="query"]').val('');

		ASF.page.url = '/search/' + query;
		ASF.page.updateUrl = true;
		ASF.page.load();
	},	

	settings: {
		saveDOB: function (node) {
			var dob = node.val();

			$.post('/user/save/dob', {
				dob: dob
			}).done(function (response) {
				ASF.message.alert(response.message);
			}).fail(function (response) {
				ASF.message.error(response.responseJSON.error);
				return false;
			});
		},

		saveName: function (node) {
			var name = node.val();

			$.post('/user/save/name', {
				name: name
			}).done(function (response) {
				ASF.message.alert(response.message);
			}).fail(function (response) {
				ASF.message.error(response.responseJSON.error);
				return false;
			});
		},

		saveLocation: function (node) {
			var location = node.val();

			$.post('/user/save/location', {
				location: location
			}).done(function (response) {
				ASF.message.alert(response.message);
			}).fail(function (response) {
				ASF.message.error(response.responseJSON.error);
				return false;
			});
		},

		saveDateFormat: function (node) {
			var format = node.find('option:selected').val();

			$.post('/user/save/dateFormat', {
				format: format
			}).done(function (response) {
				ASF.message.alert(response.message);
			}).fail(function (response) {
				ASF.message.error(response.responseJSON.error);
				return false;
			});
		}
	},

	utils: {
		toUrl: function (string) {
			return encodeURIComponent(string).replace(/%20/g, '-');
		}
	},

	profile: {

		deleteComment: function (node) {
			var commentId = node.attr('data-commentid');

			$.post('/profile/deleteComment', {
				commentId: commentId
			}).done(function () {
				$('.profile-comment-' + commentId).remove();
			}).fail(function (response) {
				ASF.message.error(response.responseJSON.error);
				return false;
			});
		},

		likeComment: function (node) {

			var commentId = node.attr('data-commentid');

			socket.get('/profile/likeComment', {
				commentId: commentId
			}, function (response) {
				if (response.error) {
					ASF.message.error(response.error);
					return false;
				}

				var currentLikes = parseInt($('.profile-comment-likes[data-comment="' + commentId + '"]').text().trim(), 10);
				var newLikes = currentLikes + 1;

				$('.profile-comment-likes[data-comment="' + commentId + '"]').text(newLikes);
			});
		},

		follow: function (node) {
			var userId = node.attr('data-userid');

			socket.get('/user/follow', {
				userId: userId
			}, function (response) {

				if (response.error) {
					ASF.message.error(response.error);
					return false;
				}

				node.text('Unfollow')
					.removeClass('btn-primary')
					.addClass('btn-danger')
					.attr('data-action', 'profile.unfollow');
			});
		},

		unfollow: function (node) {
			var userId = node.attr('data-userid');

			socket.get('/user/unfollow', {
				userId: userId
			}, function (response) {

				if (response.error) {
					ASF.message.error(response.error);
					return false;
				}

				node.text('Follow')
					.removeClass('btn-danger')
					.addClass('btn-primary')
					.attr('data-action', 'profile.follow');
			});
		},

		addComment: function (node) {
			var profileId = node.find('[name="profileId"]').val();
			var comment = node.find('[name="profile-comment"]').val();

			$.post('/profile/newComment', {
				profileId: profileId,
				comment: comment
			}, function (response) {
				if (response.error) {
					ASF.message.error(response.error);
					return false;
				} else {

					ASF.elements.prepend('#profile-comments ul', '/partials/profile/comment', {comment: response.comment})

				}
			});

		},

		updateViews: function (userId) {

			if (!userId) {
				return false;
			}

			$.post('/profile/updateViews', {
				userId: userId
			});
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
					$('#no-comments').remove();
					
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
						$($('<p id="no-topics" class="alert alert-warning" />').text('No more topics')).insertAfter('#topics .content');
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
			var content = contentElement.html();

			content = content.replace(/\n/g, '<br />');

			socket.get('/topic/create', {
				name: name,
				content: content,
				forum: ASF.globals.forum.id
			}, function (response) {

				if (response.error) {
					ASF.elements.removeLoader(node);

					return ASF.errors.parse(response);	
				}

				var urlPrefix = '/' + ASF.utils.toUrl(ASF.globals.forum.name);
				var url = urlPrefix + '/' + ASF.utils.toUrl(response.topic.name) + '-' + response.topic.id;

				history.pushState({
					url: url
				}, 'Title', url);
				ASF.page.load(url);

			});
		},

		newTrigger: function (node) {

			if (ASF.user == null) {
				ASF.message.error('You must be logged in.');
				return false;
			}

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

		},

		updateViews: function (topicId) {
			$.post('/topic/updateViews', {
				topicId: topicId
			});
		}

	},

	post: {

		reportTrigger: function (node) {
			var modal = $('#report-modal');
			var postId = node.attr('data-postid');

			modal.find('input[name="postId"]').val(postId);

			modal.modal({
				backdrop: false,
				show: true
			});
		},

		report: function (node) {

			var postId = node.find('input[name="postId"]').val();
			var reason = node.find('textarea[name="reason"]').val();

			$.post('/post/report', {
				postId: postId,
				reason: reason
			}).done(function (response) {
				var modal = $('#report-modal');
				node.find('textarea[name="reason"]').val('');
				modal.modal('hide');

				ASF.message.alert(response.message);
			}).fail(function (response) {
				console.log(response);
				ASF.message.error(response.responseJSON.error);
			});

		},

		quote: function (node) {

			if ($('#post-blank').length) {
				$('#post-blank').remove();
			}

			var postId = node.attr('data-postid');
			var author = node.attr('data-author');
			var name = node.attr('data-postname');

			if (ASF.user == null) {
				ASF.message.error('You must be logged in.');
				return false;
			}

			$('#add-post').addClass('hide');

			ASF.elements.insertAfter('.post-' + postId, 'partials/post/single-blank', {
				reply: {
					author: author,
					name: name,
					postId: postId
				}
			});

		},

		edit: function (node) {
			var postId = node.attr('data-postId');
			var contentWrapper = $('#post-' + postId).find('.post-content');

			$.post('/post/get', {
				postId: postId
			}).done(function (post) {
				contentWrapper.attr('contenteditable', true).text(post.raw).focus();

				contentWrapper.on('blur', function () {
					var content = contentWrapper.html();
					ASF.post.save(postId, content);
				});
			});
			
		},

		save: function (postId, content) {

			$.post('/post/save', {
				postId: postId,
				content: content
			}).done(function (response) {
				var contentWrapper = $('#post-' + postId).find('.post-content');

				contentWrapper.html(response.post.content);
				contentWrapper.removeAttr('contenteditable');

				ASF.message.alert(response.message);
			}).fail(function (error) {
				ASF.message.error(error);
			});
		},

		showOtherLikes: function (node) {
			var likes = JSON.parse(node.attr('data-likes'));
			var modal = $('#other-likes-modal');

			for (var i=0; i<likes.length; i++) {
				var like = likes[i];

				var tr = $('<tr />');
				var td = $('<td />');
				td.html('<a href="/user/' + like.username + '">' + like.username + '</a>');
				tr.append(td);
				var td = $('<td />');
				td.text(like.createdAt);
				tr.append(td);

				modal.find('tbody').append(tr);
			}

			modal.modal('show');
		},

		create: function (node) {
			var nameElement = $('.title-edit:first');
			var contentElement = $('.post-content.editable');

			if (contentElement.find('.placeholder').length) {
				ASF.message.error('Please fill in all fields.');
				return false;
			}

			nameElement.find('.placeholder').remove();

			var name = nameElement.text().trim();
			var content = contentElement.html();

			var quoted = null;

			if (node.attr('data-quoted')) {
				quoted = node.attr('data-quoted');
			}

			$.post('/post/create', {
				name: name,
				content: content,
				forum: ASF.globals.forum.id,
				topic: ASF.globals.topic.id,
				quoted: quoted
			}).done(function (response) {

				$('.helper').remove();

				ASF.elements.append('#post-list', 'partials/post/single', {post: response.post});

				$('#add-post').removeClass('hide');
				$('#post-blank').remove();

			}).fail(function (response) {

				ASF.elements.removeLoader(node);

				return ASF.errors.parse(response);

			});

		},

		newTrigger: function (node) {

			if (ASF.user == null) {
				ASF.message.error('You must be logged in.');
				return false;
			}

			ASF.elements.append('#post-list', 'partials/post/single-blank');

			node.addClass('hide');
			$('#save-post').removeClass('hide');

		},

		like: function (node) {
			var postId = node.attr('data-postId');

			if (!postId) {
				return false;
			}

			$.post('/post/like', {
				postId: postId
			}).done(function () {

			}).fail(function (error) {
				ASF.message.error(error);
			});
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

				return ASF.message.error(response.responseJSON.error);

			});

		},

		login: function (node) {

			var username = node.find('input[name="username"]').val().trim();
			var password = node.find('input[name="password"]').val().trim();

			socket.get('/login', {
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

					ASF.user = response;

					ASF.elements.replace('#userbox', 'sidebars/userbox', params);
					ASF.elements.replace('#nav-quick-access', 'partials/user/navQuickAccess', params);
				
					$('#login-modal').modal('hide');
				} else {
					ASF.elements.removeLoader(node);

					return ASF.message.error(response.error);
				}

			});

		},

		logout: function (node) {
			socket.get('/session/destroy', function (response) {

				console.log(response);
				
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

		insertAfter: function (target, element, params) {
			$.post('/element', {
				element: element,
				params: params
			}).done(function (html) {
				$(html).insertAfter(target);
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

		url: location.pathname,

		sidebars: [],

		updateUrl: false,

		load: function (url) {

			console.log('ASF:load');

			if (url) {
				console.log('ASF:load:urlUpdate');
				ASF.page.url = url;
			}

			$.get(ASF.page.url).done(function (response) {

				if (ASF.page.updateUrl === true) {
					console.log('ASF:load:pushState');

					window.history.pushState({
						url: ASF.page.url
					}, null, ASF.page.url);

					ASF.page.updateUrl = false;
				}

				console.log('ASF:load:response');

				$('#main-wrapper').html(response);

				if (ASF.page.sidebars.length) {
					ASF.page.showSidebar();
				} else {
					ASF.page.hideSidebar();
				}

				return;
				
			});

		},

		request: function (url) {
			console.log('ASF:request');

			if (window.history.pushState) {
				ASF.page.updateUrl = true;
				ASF.page.load(url);

				return;
			}

			ASF.page.load(url);
		},

		hideSidebar: function () {
			console.log('ASF:hideSidebar');

			$('#sidebar').hide();
			$('#main-wrapper').removeClass('col-md-9').addClass('full');
		},

		showSidebar: function () {
			$('#sidebar').empty();

			// Add/hide sidebars based on current page settings
			ASF.elements.append('#sidebar', '/partials/sidebars', {sidebars: ASF.page.sidebars});

			$('#sidebar').show();
			$('#main-wrapper').removeClass('full').addClass('col-md-9');
		}
	}

};