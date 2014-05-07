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

		it('should round down', function () {

			expect(
				swig.render('{{1.2|round}}')
			)
			.to.equal('1');

		});

		it('should round up', function () {

			expect(
				swig.render('{{1.5|round}}')
			)
			.to.equal('2');

		});

	});

});
