/**
 * PostController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	create: function (req, res) {
		var name = req.param('name');
		var content = req.param('content');

		var topicId = req.param('topic');
		var forumId = req.param('forum');

		if (!forumId || !topicId) {
			return res.send(500);
		}

		if (!name || !content) {
			return res.json({
				error: 'Please fill in all fields'
			}, 400);
		}

		if (!req.session.authenticated) {
			return res.json({
				error: 'You must be logged in.'
			}, 403);
		}

		Post.create({
			name: name,
			content: content,
			author: req.session.User.id,
			topic: topicId,
			forum: forumId
		}).done(function (error, post) {

			if (error) {
				return res.send(500);
			}

			Topic.update({
				id: topicId
			}, {
				lastAuthor: req.session.User.id,
				lastPost: post.id
			}).done(function (error, topic) {

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
				}).done(function (error, forum) {

					if (error) {
						return res.send(500);
					}

					post.forum = forum[0];

					return res.json({
						post: post
					}, 200);

				});

			})

		});
	}

};
