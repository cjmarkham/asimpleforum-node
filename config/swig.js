var swig = require('swig');
var moment = require('moment');

swig.setFilter('json_encode', function (object) {
	return JSON.stringify(object);
});

swig.setFilter('toUrl', function (string) {
	return encodeURIComponent(string).replace(/%20/g, '-');
});

swig.setFilter('toDate', function (date, format) {

	if (!format) {
		format = 'Do MMMM YY, HH:mm';
	}

	return moment(date).format(format);
});