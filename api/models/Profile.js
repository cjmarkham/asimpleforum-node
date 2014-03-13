/**
 * Profile
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'profiles',
	adapter: 'mysql',

	attributes: {

		name: 'string',
		location: 'string',
		dob: 'date',
		gender: 'string',
		views: {
			type: 'integer',
			defaultsTo: 0
		}

	}

};
