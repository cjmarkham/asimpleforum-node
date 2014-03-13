/**
 * Follower
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'followers',
	adapter: 'mysql',

	attributes: {

		userId: 'integer',
		following: 'integer'

	}

};
