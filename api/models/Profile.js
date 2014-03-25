/**
 * Profile
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'profiles',

	attributes: {

		name: 'string',
		views: {
			type: 'integer',
			defaultsTo: 0
		},
		location: 'string',
		dob: 'datetime',
		gender: {
			type: 'integer',
			defaultsTo: 3
		}

	}

};