/**
 * Session
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'sessions',

	attributes: {

		user_agent: 'string',
		ip: 'string',
		
		user_id: {
			model: 'User'
		}

	}
};
