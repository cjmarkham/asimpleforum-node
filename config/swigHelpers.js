var swig = require('swig');
var moment = require('moment');

swig.setFilter('toDate', function (date) {
	return moment(date).format('Do MMMM YY, hh:mm');
});

swig.setFilter('toUrl', function (string) {
	return encodeURIComponent(string).toLowerCase().replace(/%20/g, '-');
});

swig.setFilter('round', function (integer) {
	return Math.round(integer);
});