var ejs = require('ejs');
var moment = require('moment');

ejs.filters.toDate = function (date) {
	return moment(date).format('Do MMMM YY, hh:mm');
};

ejs.filters.date = function (date, format) {

	if (format === 'c') {
		date = moment(date).format();
	} else {
		date = moment(date).format(format);
	}

	return date;
};

ejs.filters.toUrl = function (string) {
	return encodeURIComponent(string).replace(/%20/g, '-');
};

ejs.filters.json_encode = function (object) {
	return JSON.stringify(object);
};

ejs.filters.truncate = function (string, length) {
	return string.length > length ? substr(string, 0, length - 2) + '..' : string;
};