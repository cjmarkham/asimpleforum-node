/**
 * Bootstrap
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {

	// Set all users to offline when server restarted
	User.update({}, {
		active: false
	}, function (error, updated) {
		if (error) {
			console.error(error);
			return false;
		}

		cb();
	});
};