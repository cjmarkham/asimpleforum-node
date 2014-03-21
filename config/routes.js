module.exports.routes = {

	'/': {
		controller: 'HomeController',
		action: 'index'
	},

	'get /register': {
		controller: 'UserController',
		action: 'register'
	},

	'post /register': {
		controller: 'UserController',
		action: 'create'
	},

	'post /login': {
		controller: 'SessionController',
		action: 'create'
	},

	'get /logout': {
		controller: 'SessionController',
		action: 'destroy'
	},

	'post /element': {
		controller: 'ElementController',
		action: 'render'
	},

	'get /user/subscribe': {
		controller: 'UserController',
		action: 'subscribe'
	},

	'get /:forum': {
		controller: 'ForumController',
		action: 'index'
	},

};