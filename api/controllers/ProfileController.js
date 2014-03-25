module.exports = {

	view: function (req, res) {

		var username = req.param('username');

		User
		.findOneByUsername(username)
		.populate('profile')
		.done(function (error, user) {
			if (error) {
				res.send(500);
			}

			if (!user) {
				res.notFound();
			}

			res.view({
				title: user.username,
				section: 'profile',
				user: user,
				following: false,
				layout: req.xhr ? false : 'layout'
			});
		});

	},

	loadPostHistory: function (req, res) {

		var userId = req.param('userId');
		var offset = req.param('offset');

		if (!userId) {
			return res.send(400);
		}

		Post.find({
			author: userId
		})
		.skip(offset)
		.limit(6)
		.populate('author')
		.populate('forum')
		.populate('topic')
		.sort({ createdAt: 'desc' })
		.done(function (error, posts) {
			if (error) {
				return res.send(500);
			}

			return res.json(posts, 200);
		});
	},

	loadComments: function (req, res) {

		var userId = req.param('userId');
		var offset = req.param('offset');

		if (!userId) {
			return res.send(400);
		}

		ProfileComment.find({
			profile: userId
		})
		.skip(offset)
		.limit(6)
		.populate('author')
		.sort({ createdAt: 'desc' })
		.done(function (error, comments) {
			if (error) {
				return res.send(500);
			}

			return res.json(comments, 200);
		});
	},

	updateViews: function (req, res) {
		var userId = req.param('userId');

		if (!userId) {
			return res.send(500);
		}

		Profile.findOneById(userId).done(function (error, profile) {
			if (error) {
				return res.send(500);
			}

			profile.views = parseInt(profile.views) + 1;

			profile.save(function (error, profile) {
				if (error) {
					return res.send(500);
				}

				return res.send(200);
			});
		})
	}

};