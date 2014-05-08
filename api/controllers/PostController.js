/**
 * PostController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	like: function (req, res) {
		if (!req.session.authenticated) {
			return res.json({
				error: 'You must be logged in'
			}, 403);
		}

		var postId = req.param('postId');

		Likes.create({
			username: req.session.User.username,
			post: postId
		}).exec(function (error, like) {
			if (error) {
				return res.json({
					error: error.summary
				}, 500);
			}

			return res.json({
				error: false
			});
		})
	},

	save: function (req, res) {
		var postId = req.param('postId');
		var content = req.param('content');

		Post.update({
			id: postId
		}, {
			content: content
		}, function (error, post) {
			if (error) {
				return res.json({
					error: error
				}, 500);
			}

			return res.json({
				error: false,
				post: post
			});
		});
	},

	create: function (req, res) {
		var name = req.param('name');
		var content = req.param('content');

		var topicId = req.param('topic');
		var forumId = req.param('forum');

		if (!forumId || !topicId) {
			return res.send(500);
		}

		if (!content) {
			return res.json({
				error: 'Please fill in all fields'
			}, 400);
		}

		if (!req.session.authenticated) {
			return res.json({
				error: 'You must be logged in.'
			}, 403);
		}

		Topic.findOneById(topicId).exec(function (error, topic) {

			if (!name) {
				name = 'RE: ' + topic.name;
			}

			Post.create({
				name: name,
				content: content,
				author: req.session.User.id,
				topic: topic.id,
				forum: forumId
			}).exec(function (error, post) {

				if (error) {
					return res.send(500);
				}

				Topic.update({
					id: topic.id
				}, {
					lastAuthor: req.session.User.id,
					lastPost: post.id,
					replies: topic.replies + 1
				}).exec(function (error, topic) {

					if (error) {
						return res.send(500);
					}

					post.topic = topic[0];

					Forum.update({
						id: forumId
					}, {
						lastAuthor: req.session.User.id,
						lastPost: post.id,
						lastTopic: topic[0].id
					}).exec(function (error, forum) {

						if (error) {
							return res.send(500);
						}

						post.forum = forum[0];
						post.author = req.session.User;

						User.update({
							id: req.session.User.id
						}, {
							posts: req.session.User.posts + 1
						}, function (error, user) {

							return res.json({
								post: post,
								error: false
							}, 200);

						});

					});

				});

			});

		});
	}

};
