/**
 * Setting
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	tableName: 'settings',

	attributes: {

		dateFormat: {
            type: 'string',
            defaultsTo: 'jS M Y, H:i'
        }

	}

};