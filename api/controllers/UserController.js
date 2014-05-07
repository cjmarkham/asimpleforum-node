/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	register: function (req, res) {

		return res.view({
			title: 'Sign up',
			section: 'auth',
			layout: req.xhr ? '../layout-ajax.swig' : '../layout.swig'
		});

	},

	login: function (req, res) {

		return res.view({
			section: 'auth'
		});

	},

	create: function (req, res) {

		var data = {
			username: req.param('username'),
			password: req.param('password'),
			confirm: req.param('confirm'),
			email: req.param('email'),
			ip: req.connection.remoteAddress
		};

		User.create(data, function created (error, user) {
			if (error) {
				return res.json({
					error: error
				}, 400);
			}

			user.active = true;

			req.session.authenticated = true;
      		req.session.User = user;

      		user.save(function (error, user) {

      			if (error) {
					return res.json({
						error: 'Server error'
					}, 500);
				}

      			User.publishCreate(user);

      			Profile.create({
      				id: user.id
      			}, function (error, profile) {
      				user.profile = profile;
      				return res.json(user, 200);
      			});
  				
      		});

		});

	},

	subscribe: function (req, res) {

		User.find({}).exec(function (error, users) {
			
			if (error) {
				return res.json({
					error: error
				});
			}

			// Subscribe to the model class
			User.watch(req.socket);
			Topic.watch(req.socket);

			// subscribe to the model instance
			User.subscribe(req.socket, users);
			Topic.subscribe(req.socket, users);

			return res.send(200);

		});
		

	},

	settings: function (req, res) {
		return res.view({
			title: 'Settings',
			section: 'settings',
			layout: req.xhr ? '../layout-ajax.swig' : '../layout.swig'
		});
		
	},

	saveAvatar: function (req, res) {

		var fs = require('fs');
		var im = require('imagemagick');

		var avatar = req.files.avatar;
		console.log(avatar);

		var name = avatar.originalFilename;
		var size = avatar.size;

		if (size > sails.config.files.maxSize) {
			return res.send('File size is too big', 400);
		}

		var nameParts = name.split('.');
		var extension = nameParts[nameParts.length - 1];

		if (sails.config.files.types.indexOf(extension) == -1) {
			return res.send('Invalid file type. Expected one of ' + sails.config.files.types.join(', ') + ' but got ' + extension, 400);
		}

		var path = 'assets/uploads/avatars/' + req.session.User.username + '/avatar.png';

		fs.readFile(req.files.avatar.path, function (error, data) {
			if (error) {
				return res.send(error, 500);
			}

			fs.writeFile(path, data, function (error) {
				if (error) {
					return res.send(error, 500);
				}

				return res.send(200);
			});
		});
	},

	saveDOB: function (req, res) {

		if (!req.session.authenticated) {
			return res.json({
				error: res.__('MUST_BE_LOGGED_IN')
			}, 403);
		}

		var dob = req.param('dob');

		if (!dob) {
			return res.json({
				error: res.__('FILL_ALL_FIELDS')
			}, 400);
		}

		Profile.update({
			id: req.session.User.id
		}, {
			dob: dob
		}, function (error, profile) {
			if (error) {
				return res.json({
					error: res.__(error.summary)
				}, 500);
			}

			req.session.User.profile = profile[0];

			return res.json({
				error: false,
				message: res.__('DOB_UPDATED')
			});
		})
	},

	saveName: function (req, res) {

		if (!req.session.authenticated) {
			return res.json({
				error: res.__('MUST_BE_LOGGED_IN')
			}, 403);
		}

		var name = req.param('name');

		if (!name) {
			return res.json({
				error: res.__('FILL_ALL_FIELDS')
			}, 400);
		}

		Profile.update({
			id: req.session.User.id
		}, {
			name: name
		}, function (error, profile) {
			if (error) {
				return res.json({
					error: res.__(error.summary)
				}, 500);
			}

			req.session.User.profile = profile[0];

			return res.json({
				error: false,
				message: res.__('NAME_UPDATED')
			});
		})
	},

	saveLocation: function (req, res) {

		if (!req.session.authenticated) {
			return res.json({
				error: res.__('MUST_BE_LOGGED_IN')
			}, 403);
		}

		var location = req.param('location');

		if (!location) {
			return res.json({
				error: res.__('FILL_ALL_FIELDS')
			}, 400);
		}

		Profile.update({
			id: req.session.User.id
		}, {
			location: location
		}, function (error, profile) {
			if (error) {
				return res.json({
					error: res.__(error.summary)
				}, 500);
			}

			req.session.User.profile = profile[0];

			return res.json({
				error: false,
				message: res.__('LOCATION_UPDATED')
			});
		})
	}

};
