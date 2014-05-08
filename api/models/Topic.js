/**
 * Topic
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'topics',

	attributes: {

		name: {
			type: 'string',
			required: true
		},
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
