/**
 * ElementController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	index: function (req, res) {

		var swig = require('swig');
		var path = require('path');

		var directory = req.param('directory') || '';
		var element = req.param('element');

		var template = swig.compileFile(path.normalize('../views') + '/' + directory + '/' + element + '.swig', {
			resolveFrom: __dirname
		});

		res.send(template({
			req: req
		}));
		
	}

};
