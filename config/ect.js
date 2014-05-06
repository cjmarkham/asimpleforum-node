var moment = require('moment');

module.exports.helpers = {
	jsonEncode: function (string) {
		return JSON.stringify(string);
	},

	toUrl: function (string) {
		return encodeURIComponent(string).replace(/%20/g, '-');
	},

	isoDate: function (string) {
		return moment(string).format();
	},

	toDate: function (string) {
		return moment(string).format('DD MM YY HH:ii');
	}
};