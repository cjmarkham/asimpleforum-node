/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'users',
	adapter: 'mysql',

	attributes: {

		username: {
			type: 'string',
			unique: true,
			required: true
		},
		password: {
			type: 'string',
			required: true
		},
		ip: 'string',
		email: {
			type: 'email',
			unique: true,
			required: true
		},
		perm_group: {
			model: 'Group'
		},
		topics: {
			type: 'integer',
			defaultsTo: 0
		},
		posts: {
			type: 'integer',
			defaultsTo: 0
		},
		approved: {
			type: 'integer',
			defaultsTo: 0
		},
		lastActive: 'datetime',
		locale: {
			type: 'string',
			defaultsTo: 'en'
		},

		toJSON: function() {
			var obj = this.toObject();
			
			delete obj.password;

			return obj;
		}

	},

	beforeCreate: function (attributes, next) {
		var bcrypt = require('bcrypt-nodejs');

		if (!attributes.password || attributes.password != attributes.confirm) {
			return next({
				error: ["Password doesn't match password confirmation."]
			});
		}

		bcrypt.genSalt(10, function (error, salt) {
			if (error) {
				return next(error);
			}

			bcrypt.hash(attributes.password, salt, null, function (error, hash) {
				if (error) {
					return next(error);
				}

				attributes.password = hash;

				next();
			})
		});
	}

};
