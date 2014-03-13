/**
 * AuthController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {	

	register: function (req, res, next) {

		var data = {
			username: req.param('username'),
			password: req.param('password'),
			confirm: req.param('confirm'),
			email: req.param('email'),
			ip: req.connection.remoteAddress
		};

		User.create(data, function created (error, user) {
			if (error) {
				return res.json(error, 400);
			}

			req.session.authenticated = true;
      		req.session.User = user;

      		user.save(function (error, user) {

      			if (error) {
					return res.json({
						error: 'Server error'
					}, 500);
				}

      			User.publishCreate(user);

  				return res.json(user, 200);
      		});

		});

	},

	login: function (req, res) {

		var bcrypt = require('bcrypt-nodejs');

		User.findOneByUsername(req.param('username')).done(function (error, user) {

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

			bcrypt.compare(req.param('password'), user.password, function (error, match) {

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

					return req.json({
						error: 'Invalid credentials'
					}, 400);
				}

				req.session.authenticated = true;
				req.session.User = user;

				user.save(function (error, user) {

	      			if (error) {
						return res.json({
							error: 'Server error'
						}, 500);
					}

	      			User.publishCreate(user);

	  				return res.json(user, 200);
	      		});

			});

		});

	}

};