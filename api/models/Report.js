/**
 * Report
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'reports',

	attributes: {

		post: {
            model: 'Post',
            defaultsTo: null
        },
        user: {
            model: 'User',
            defaultsTo: null
        },
		reporter: {
            model: 'User'
        },
		reason: 'text',
		status: {
            type: 'string',
            defaultsTo: 'new'
        }

	}

};
