/**
 * TopicController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	index: function (req, res) {

		var url = req.param('topic');
		var parts = url.split('-');

		var topicId = parts[parts.length - 1];

		Topic.findOneById(topicId).done(function (error, topic) {
			if (error) {
				return res.send(error, 500);
			}

			if (!topic) {
				return res.send(404);
			}

			Post.find({
				topic: topicId
			})
			.populate('author')
			.sort({ createdAt: 'asc' })
			.done(function (error, posts) {
				if (error) {
					return res.send(error, 500);
				}

				res.view({
					title: topic.name,
					section: 'forum',
					topic: topic,
					posts: posts,
					layout: req.xhr ? false : 'layout'
				});

			});
		});

	},

	"new": function (req, res) {

		var url = req.param('forum');
		var parts = url.split('-');

		var forumId = parts[parts.length - 1];

		Forum.findOneById(forumId).done(function (error, forum) {

			res.view({
				title: 'New topic',
				forum: forum,
				section: 'forum',
				layout: req.xhr ? false : 'layout'
			});

		});

	},

	create: function (req, res) {

		var name = req.param('name');
		var content = req.param('content');
		var forum = req.param('forum');

		if (!name || !content) {
			return res.send('Please fill in all fields', 400);
		}

		if (!forum) {
			return res.send('No forum id found', 500);
		}

		if (req.session.authenticated === false || !req.session.authenticated) {
			return res.send('You must be logged in', 403);
		}

		Topic.create({
			name: name,
			author: req.session.User.id,
			forum: forum
		}).done(function (error, topic) {
			if (error) {
				return res.send(error, 500);
			}

			Post.create({
				name: name,
				content: content,
				topic: topic.id,
				author: req.session.User.id
			}).done(function (error, post) {
				if (error) {
					return res.send(error, 500);
				}

				topic.forum = forum;

				var data = {
					topic: topic,
					id: topic.id
				};
				data.topic.author = req.session.User;

				Topic.publishCreate(data);

				return res.json({topic: topic, post: post}, 200);
			});
		})

	},

	morePosts: function (req, res) {

		var topicId = req.param('topicId');

		if (!topicId) {
			return res.send('No topic id', 500);
		}

		var offset = req.param('offset') || 0;

		Post.find({
			topic: topicId
		})
		.populate('author')
		.populate('topic')
		.sort({ createdAt: 'desc' })
		.limit(sails.config.board.postsPerPage)
		.skip(offset)
		.done(function (error, posts) {

			if (error) {
				return res.send(error, 500);
			}

			return res.json(posts, 200);

		});


	}

};
