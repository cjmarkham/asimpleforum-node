var swig = require('../node_modules/swig'),
	expect = require('expect.js'),
	_ = require('lodash'),
	Swig = swig.Swig;

require('../config/swigHelpers.js');

describe('Filters:', function () {

	describe('toUrl', function () {
		
		it('should return a lowercase encoded url', function () {

			expect(
				swig.render('{{"A Simple Forum is awesome!"|toUrl}}')
			)
			.to.equal('a-simple-forum-is-awesome!');
		
		});

	});

	describe('toDate', function () {

		it('should return a formatted date string', function () {

			// Filter needs to be finished

		});

	});

	describe('round', function () {

		it('should return a rounded string integer', function () {

			expect(
				swig.render('{{1.6|round}}')
			)
			.to.equal('2');

		});

	});

});
