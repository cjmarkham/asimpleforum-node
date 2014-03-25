/**
 * Forum
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'forums',

	attributes: {

		parent: {
			type: 'integer',
			defaultsTo: 0
		},
		name: 'string',
		left: 'integer',
		right: 'integer',
		description: 'text',
		topics: {
			type: 'integer',
			defaultsTo: 0
		},
		posts: {
			type: 'integer',
			defaultsTo: 0
		},
		locked: {
			type: 'integer',
			defaultsTo: 0
		},

		// One to one
		lastTopic: {
			model: 'Topic'
		},

		lastPost: {
			model: 'Post'
		},

		lastAuthor: {
			model: 'User'
		}
	}
};
