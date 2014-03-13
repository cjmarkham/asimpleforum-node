/**
 * Session
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'sessions',
	adapter: 'mysql',

	attributes: {

		ip: 'string',
		userId: 'integer',
		userAgent: 'string',
		active: 'datetime'

	}

};
