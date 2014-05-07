/**
 * Topic
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'notifications',

	attributes: {

		user_id: 'integer',
		notification: 'text',
		added: 'datetime',
		read: {
			type: 'integer',
			defaultsTo: 0
		}

	}

};
