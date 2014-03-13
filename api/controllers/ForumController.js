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

		Forum.findOneById(forumId).done(function (error, forum) {

			Topic.find({
				forum: forumId
			})
			.populate('author')
			.populate('lastPost')
			.populate('lastAuthor')
			.done(function (error, topics) {
				
				res.view({
					title: 'Forum',
					section: 'forum',
					forum: forum,
					topics: topics
				});

			});

			

		});

		
	}

};
