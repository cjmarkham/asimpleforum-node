module.exports = function (req, res, next) {
	var locale = 'en';

	if (req.session.authorized) {
		locale = req.session.User.settings.locale;
	}

	res.setLocale(locale);
	next();
};