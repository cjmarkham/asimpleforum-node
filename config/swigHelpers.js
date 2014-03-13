var swig = require('swig');
var moment = require('moment');

swig.setFilter('toDate', function (date) {
	return moment(date).format('Do MMMM YY, hh:mm');
});