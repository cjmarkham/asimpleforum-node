/**
 * Profile Comment
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'profile_comments',

	attributes: {

		profile: {
			model: 'Profile'
		},
		author: {
			model: 'User'
		},
		comment: 'string',
		deleted: {
			type: 'integer',
			defaultsTo: 0
		},
		likes: {
			collection: 'ProfileCommentLike',
			via: 'id'
		}

	}

};
