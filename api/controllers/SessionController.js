/**
 * SessionController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {	

	create: function (req, res) {

		var username = req.param('username');
		var password = req.param('password');

		if (!username || !password) {
			return res.json({
				error: 'Please fill in all fields'
			}, 400);
		}

		User
		.findOneByUsername(username)
		.populate('profile')
		.populate('settings')
		.exec(function (error, user) {

			if (error) {
				return res.json({
					error: 'Server error'
				}, 500);
			}

			if (!user) {
				return res.json({
					error: 'No User found'
				}, 400);
			}

			bcrypt.compare(password, user.password, function (error, match) {

				if (error) {
					return res.json({
						error: 'Server error'
					}, 500);
				}

				if (!match) {
					if (req.session.User) {
						req.session.User = null;
						req.session.authenticated = false;
					}

					return res.json({
						error: res.__('INVALID_CREDENTIALS')
					}, 400);
				}


				user.active = true;
				req.session.authenticated = true;
				req.session.User = user;

				User.update({
					id: user.id
				}, {	
					active: true
				}, function (error) {

					if (error) {
						return res.send({
							error: error.summary
						}, 500);
					}

					User.publishUpdate(user.id, {
						loggedIn: true,
						id: user.id,
						username: user.username,
						action: ' has logged in'
					});

					return res.json(user, 200);
				});

			});

		});

	},

	destroy: function (req, res) {

		if (!req.session.authenticated) {
			return res.send(403);
		}

		User.update({
			id: req.session.User.id
		}, {
			active: false
		}).exec(function (error, updated) {

			if (error) {
				return res.json({
					error: error
				}, 500);
			}

			User.publishUpdate(req.session.User.id, {
				loggedIn: false,
				username: req.session.User.username,
				id: req.session.User.id
			});

			req.session.authenticated = false;
			req.session.User = null;

			return res.send(200);
		});

	},

	list: function (req, res) {

		User.findByActive(true).exec(function (error, users) {
			if (error) {
				return res.send(error, 500);
			}

			console.log(users);

			return res.json(users, 200);
		});

	}

};