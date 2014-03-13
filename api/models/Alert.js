/**
 * Alert
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'alerts',
	adapter: 'mysql',

	attributes: {

		title: 'string',
		text: 'string',
		starts: 'datetime',
		expires: 'datetime',
		pages: 'text'

	}

};
