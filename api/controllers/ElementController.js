/**
 * ElementController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	render: function (req, res) {

		var ejs = require('ejs');
		var path = require('path');
		var fs = require('fs');

		var element = req.param('element');
		var filename = 'views/' + element + '.ejs';

		var template = fs.readFileSync(filename, 'utf8');

		var params = req.param('params') || {};
		params.filename = filename;
		params.req = req;

		res.send(ejs.render(template, params), 200);
		
	}

};
