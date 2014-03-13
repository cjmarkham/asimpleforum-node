/**
 * Group
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'groups',
	adapter: 'mysql',

	attributes: {

		'default': 'integer',
		name: 'string',
		permission: 'integer'

	}
};
