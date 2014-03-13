/**
 * Like
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'likes',
	adapter: 'mysql',

	attributes: {

		postId: 'integer',
		username: 'string',
		added: 'datetime'

	}

};
