/**
 * Attachment
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'attachments',

	attributes: {

		postId: 'integer',
		name: 'string',
		fileName: 'string',
		size: 'integer',
		mime: 'string'

	}

};
