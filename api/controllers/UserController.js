/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	register: function (req, res) {

		res.view();

	},

	login: function (req, res) {

		res.view();

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
				return res.json(error, 400);
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

  				return res.json(user, 200);
      		});

		});

	},

	subscribe: function (req, res) {

		User.find({}).exec(function (error, users) {
			
			if (error) {
				res.json({
					error: error
				});
			}

			// Subscribe to the model class
			User.watch(req.socket);

			// subscribe to the model instance
			User.subscribe(req.socket, users);

			res.send(200);

		});
		

	}

};
