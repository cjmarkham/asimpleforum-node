module.exports = {

	view: function (req, res) {

		var username = req.param('username');

		User.findOneByUsername(username)
			.populate('profile')
			.exec(function (error, user) {
				if (error) {
					return res.send(500);
				}

				if (!user) {
					return res.notFound();
				}

				return res.view({
					title: user.username,
					section: 'profile',
					user: user,
					following: false,
					layout: req.xhr ? '../layout-ajax.swig' : '../layout.swig'
				});
			});

	},

	newComment: function (req, res) {

		var profileId = req.param('profileId');
		var comment = req.param('comment');

		if (comment.length == 0) {
			return res.json({
				error: 'Please fill in all fields'
			}, 403);
		}

		if (!req.session.authenticated) {
			return res.json({
				error: 'You must be logged in'
			}, 403);
		}

		ProfileComment.create({
			profile: profileId,
			author: req.session.User.id,
			comment: comment
		}, function (error, comment) {

			if (error) {
				return res.json({
					error: error
				}, 500);
			}

			return res.json({
				error: false,
				comment: comment
			}, 200);
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
		.exec(function (error, posts) {
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
		.populate('likes')
		.skip(offset)
		.limit(6)
		.populate('author')
		.sort({ createdAt: 'desc' })
		.exec(function (error, comments) {
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

		Profile.findOneById(userId).exec(function (error, profile) {
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