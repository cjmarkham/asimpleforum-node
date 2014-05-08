/**
 * ElementController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	render: function (req, res) {

		var swig = require('swig');
		var path = require('path');

		var element = req.param('element');

		var params = req.param('params') || {};
		params.req = req;
		params.res = res;

		var template = swig.compileFile(path.normalize('../views') + '/' + element + '.swig', {
			resolveFrom: __dirname
		});

		res.send(template(params));
	}

};
