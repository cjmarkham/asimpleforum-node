/**
 * Topic
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'topics',
	adapter: 'mysql',

	attributes: {

		name: 'string',
		author: {
			model: 'User'
		},
		views: {
			type: 'integer',
			defaultsTo: 0
		},
		replies: {
			type: 'integer',
			defaultsTo: 0
		},
		
		sticky: {
			type: 'integer',
			defaultsTo: 0
		},
		locked: {
			type: 'integer',
			defaultsTo: 0
		},

		forum: {
			model: 'Forum'
		},

		lastPost: {
			model: 'Post'
		},

		lastAuthor: {
			model: 'User'
		}

	}

};
