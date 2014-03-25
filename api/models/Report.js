/**
 * Report
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'reports',

	attributes: {

		type: 'string',
		typeId: 'integer',
		reporter: 'integer',
		reason: 'string',
		status: 'string'

	}

};
