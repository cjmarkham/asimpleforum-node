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

	'get /session/create': {
		controller: 'SessionController',
		action: 'create'
	},

	'get /session/list': {
		controller: 'SessionController',
		action: 'list'
	},

	'get /forum/moreTopics': {
		controller: 'ForumController',
		action: 'moreTopics'
	},

	'get /topic/morePosts': {
		controller: 'TopicController',
		action: 'morePosts'
	},

	'get /profile/loadPostHistory': {
		controller: 'ProfileController',
		action: 'loadPostHistory'
	},

	'get /profile/loadComments': {
		controller: 'ProfileController',
		action: 'loadComments'
	},

	'get /profile/updateViews': {
		controller: 'ProfileController',
		action: 'updateViews'
	},

	'get /user/:username': {
		controller: 'ProfileController',
		action: 'view'
	},

	'get /:forum/new-topic': {
		controller: 'TopicController',
		action: 'new'
	},

	'get /:forum/:topic': {
		controller: 'TopicController',
		action: 'index'
	},

	'get /:forum': {
		controller: 'ForumController',
		action: 'index'
	},

};