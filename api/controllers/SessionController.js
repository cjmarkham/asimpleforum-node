/**
 * SessionController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');

module.exports = {	

	process: function (req, res) {
		passport.authenticate('local', function (error, user, info) {
			
			if (error || !user) {
				console.error(error);

				return res.json({
					error: error
				}, 403);
			}
			
			req.logIn(user, function (error) {
				if (error) {
					console.error(error);
					return res.json({
						error: error
					}, 403);
				}
				
				return res.json(user[0], 200);
			});

		})(req, res);
	},

	destroy: function (req, res) {

		if (!req.user) {
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

			req.logout();

			return res.send(200);
		});

	},

	list: function (req, res) {

		User.findByActive(true).exec(function (error, users) {
			if (error) {
				return res.send(error, 500);
			}

			return res.json(users, 200);
		});

	}

};