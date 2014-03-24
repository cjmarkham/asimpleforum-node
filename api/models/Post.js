/**
 * Post
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'posts',
	adapter: 'mysql',

	attributes: {
		
		name: {
			type: 'string',
			required: true
		},
		content: {
			type: 'text',
			required: true
		},
		
		edited: {
			type: 'integer',
			defaultsTo: 0
		},

		author: {
			model: 'User'
		},

		topic: {
			model: 'Topic'
		}

	}

};
