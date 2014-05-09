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
			ip: req.connection.remoteAddress,
		};

		User.create(data, function created (error, user) {
			if (error) {
				return res.json({
					error: error
				}, 400);
			}

			user.active = true;
			user.profile = user.id;
			user.settings = user.id;

			req.user = true;
      		req.user = user;

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

      				Setting.create({
	      				id: user.id
	      			}, function (error, settings) {
	      				user.settings = settings;
      					return res.json(user, 200);
      				});
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

		var avatar = req.files.avatar;

		var name = avatar.originalFilename;
		var size = avatar.size;

		if (size > sails.config.files.maxSize) {
			return res.json({
				error: res.__('FILE_TOO_BIG')
			}, 400);
		}

		var nameParts = name.split('.');
		var extension = nameParts[nameParts.length - 1];

		if (sails.config.files.types.indexOf(extension) == -1) {
			return res.json({
				error: res.__('INVALID_FILE_TYPE', extension)
			}, 400);
		}

		var dir = './assets' + sails.config.board.avatarDir + '/' + req.user.username;
		var path = dir + '/avatar.png';

		fs.readFile(req.files.avatar.path, function (error, data) {

			if (error) {
				return res.json({
					error: res.__(error.summary)
				}, 500);
			}

			fs.exists(dir, function (exists) {
				if (!exists) {
					fs.mkdir(dir, 0777, function () {
						fs.writeFile(path, data, function (error) {

							if (error) {
								return res.json({
									error: res.__(error.summary)
								}, 500);
							}

							return res.json({
								error: false
							}, 200);
						});
					});
				} else {

					fs.writeFile(path, data, function (error) {

						if (error) {
							return res.json({
								error: res.__(error.summary)
							}, 500);
						}

						return res.json({
							error: false
						}, 200);
					});
				}
			})

			
		});
	},

	saveDateFormat: function (req, res) {

		if (!req.user) {
			return res.json({
				error: res.__('MUST_BE_LOGGED_IN')
			}, 403);
		}

		var format = req.param('format');

		if (!format) {
			return res.json({
				error: res.__('FILL_ALL_FIELDS')
			}, 400);
		}

		Setting.update({
			id: req.user.id
		}, {
			dateFormat: format
		}, function (error, settings) {
			if (error) {
				return res.json({
					error: res.__(error.summary)
				}, 500);
			}

			req.user.settings = settings[0];

			return res.json({
				error: false,
				message: res.__('DATE_FORMAT_UPDATED')
			});
		})

	},

	saveDOB: function (req, res) {

		if (!req.user) {
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
			id: req.user.id
		}, {
			dob: dob
		}, function (error, profile) {
			if (error) {
				return res.json({
					error: res.__(error.summary)
				}, 500);
			}

			req.user.profile = profile[0];

			return res.json({
				error: false,
				message: res.__('DOB_UPDATED')
			});
		})
	},

	saveName: function (req, res) {

		if (!req.user) {
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
			id: req.user.id
		}, {
			name: name
		}, function (error, profile) {
			if (error) {
				return res.json({
					error: res.__(error.summary)
				}, 500);
			}

			req.user.profile = profile[0];

			return res.json({
				error: false,
				message: res.__('NAME_UPDATED')
			});
		})
	},

	follow: function (req, res) {

		if (!req.user) {
			return res.json({
				error: res.__('MUST_BE_LOGGED_IN')
			}, 403);
		}

		var userId = req.param('userId');

		Follower.find({
			userId: req.user.id,
			following: userId
		}).exec(function (error, follower) {
			if (follower.length) {
				return res.json({
					error: res.__('ALREADY_FOLLOWING')
				}, 400);
			}

			Follower.create({
				userId: req.user.id,
				following: userId
			}, function (error, follower) {
				if (error) {
					return res.json({
						error: res.__(error.summary)
					}, 500);
				}

				return res.json({
					error: false
				}, 200);
			});

		});
	},

	unfollow: function (req, res) {

		if (!req.user) {
			return res.json({
				error: res.__('MUST_BE_LOGGED_IN')
			}, 403);
		}

		var userId = req.param('userId');

		Follower.find({
			userId: req.user.id,
			following: userId
		}).exec(function (error, follower) {
			if (!follower.length) {
				return res.json({
					error: res.__('NOT_FOLLOWING')
				}, 400);
			}

			Follower.destroy({
				userId: req.user.id,
				following: userId
			}).exec(function (error) {
				if (error) {
					return res.json({
						error: res.__(error.summary)
					}, 500);
				}

				return res.json({
					error: false
				}, 200);
			});

		});
	},

	saveLocation: function (req, res) {

		if (!req.user) {
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
			id: req.user.id
		}, {
			location: location
		}, function (error, profile) {
			if (error) {
				return res.json({
					error: res.__(error.summary)
				}, 500);
			}

			req.user.profile = profile[0];

			return res.json({
				error: false,
				message: res.__('LOCATION_UPDATED')
			});
		})
	}

};
