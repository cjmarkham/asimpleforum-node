var ejs = require('ejs');
var moment = require('moment');

ejs.filters.toDate = function (date) {
	return moment(date).format('Do MMMM YY, hh:mm');
};

ejs.filters.date = function (date, format) {
	return moment(date).format(format);
};

ejs.filters.toUrl = function (string) {
	return encodeURIComponent(string).replace(/%20/g, '-');
};

ejs.filters.json_encode = function (object) {
	return JSON.stringify(object);
};