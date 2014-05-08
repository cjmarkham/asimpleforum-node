/**
 * ForumController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	index: function (req, res) {

		var url = req.param('forum');
		var parts = url.split('-');

		var forumId = parts[parts.length - 1];

		Forum.findOneById(forumId).exec(function (error, forum) {

			if (error) {
				return res.send(error, 500);
			}

			if (!forum) {
				return res.notFound();
			}

			// Get amount of all topics
			Topic.count().where({
				forum: forumId
			}).exec(function (error, count) {

				if (error) {
					return res.send(500);
				}

				Topic.find({
					forum: forum.id
				})
				.populate('author')
				.populate('lastPost')
				.populate('lastAuthor')
				.sort({ createdAt: 'desc' })
				.limit(sails.config.board.topicsPerPage)
				.exec(function (error, topics) {

					if (error) {
						return res.send(500);
					}

					for (var i in topics) {
						topics[i].forum = forum;
					}

					res.view({
						title: forum.name,
						section: 'forum',
						forum: forum,
						topics: topics,
						currentTopicsCount: topics.length,
						totalTopicsCount: count,
						layout: req.xhr ? '../layout-ajax.swig' : '../layout.swig'
					});

				});
			});

		});

	},

	moreTopics: function (req, res) {

		var forumId = req.param('forumId');

		if (!forumId) {
			return res.send(500);
		}

		var offset = req.param('offset') || 0;

		Topic.find({
			forum: forumId
		})
		.populate('author')
		.populate('lastPost')
		.populate('forum')
		.populate('lastAuthor')
		.sort({ createdAt: 'desc' })
		.limit(sails.config.board.topicsPerPage)
		.skip(offset)
		.exec(function (error, topics) {

			if (error) {
				return res.send(500);
			}

			return res.json(topics, 200);

		});


	}

};
