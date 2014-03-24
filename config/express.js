module.exports.express = {

	customMiddleware: function (app) {

		app.use(function (req, res, next) {

			Topic.find({

			})
			.limit(4)
			.populate('author')
			.populate('forum')
			.populate('lastPost')
			.populate('lastAuthor')
			.done(function (error, topics) {

				if (error) {
					return res.send(error, 500);
				}

				res.locals.recentTopics = topics;

				next();

			});

		});

	}

};