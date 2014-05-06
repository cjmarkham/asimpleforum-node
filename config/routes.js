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

	'get /session/destroy': {
		controller: 'SessionController',
		action: 'destroy',
		skipAssets: true
	},

	'post /login': {
		controller: 'SessionController',
		action: 'create'
	},

	'post /topic/updateViews': {
		controller: 'TopicController',
		action: 'updateViews',
		skipAssets: true
	},

	'post /post/like': {
		controller: 'PostController',
		action: 'like',
		skipAssets: true
	},

	'post /post/save': {
		controller: 'PostController',
		action: 'save',
		skipAssets: true
	},

	'post /topic/morePosts': {
		controller: 'TopicController',
		action: 'morePosts',
		skipAssets: true
	},

	'/topic/create': {
		controller: 'TopicController',
		action: 'create',
		skipAssets: true
	},

	'post /element': {
		controller: 'ElementController',
		action: 'render'
	},

	'get /user/subscribe': {
		controller: 'UserController',
		action: 'subscribe',
		skipAssets: true
	},

	'post /user/save/avatar': {
		controller: 'UserController',
		action: 'saveAvatar',
		skipAssets: true
	},

	'get /session/create': {
		controller: 'SessionController',
		action: 'create',
		skipAssets: true
	},

	'post /user/create': {
		controller: 'UserController',
		action: 'create',
		skipAssets: true
	},

	'get /session/list': {
		controller: 'SessionController',
		action: 'list',
		skipAssets: true
	},

	'get /forum/moreTopics': {
		controller: 'ForumController',
		action: 'moreTopics',
		skipAssets: true
	},

	'post /post/create': {
		controller: 'PostController',
		action: 'create',
		skipAssets: true
	},

	'post /profile/loadPostHistory': {
		controller: 'ProfileController',
		action: 'loadPostHistory',
		skipAssets: true
	},

	'post /profile/newComment': {
		controller: 'ProfileController',
		action: 'newComment',
		skipAssets: true
	},

	'post /profile/loadComments': {
		controller: 'ProfileController',
		action: 'loadComments',
		skipAssets: true
	},

	'post /profile/updateViews': {
		controller: 'ProfileController',
		action: 'updateViews',
		skipAssets: true
	},

	'get /user/settings': {
		controller: 'UserController',
		action: 'settings',
		skipAssets: true
	},

	'get /user/:username': {
		controller: 'ProfileController',
		action: 'view',
		skipAssets: true
	},

	'get /:forum/new-topic': {
		controller: 'TopicController',
		action: 'new',
		skipAssets: true
	},

	'/:forum/:topic': {
		controller: 'TopicController',
		action: 'index',
		skipAssets: true
	},

	'get /:forum': {
		controller: 'ForumController',
		action: 'index',
		skipAssets: true
	}
};