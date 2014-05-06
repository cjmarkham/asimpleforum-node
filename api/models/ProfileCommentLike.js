/**
 * Profile Comment Like
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'profile_comment_likes',

	attributes: {

		comment: 'integer',
		username: 'string',
        id: {
            model: 'ProfileComment'
        }

	}

};
