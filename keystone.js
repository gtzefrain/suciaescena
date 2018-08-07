 	// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
// require('dotenv').load();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'SLNA',
	'brand': 'SLNA',
	'port': '3010',
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': '2|@"v4%q-V8F|3PLcHJgOa%0@W!"Rc]6r]#@K{C#G;p:xs@C/"@"4RI<]!c0=97w',

	'mongo': process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://slna:lVcqBrefQr1nTr4M@slna-shard-00-00-lazbm.mongodb.net:27017,slna-shard-00-01-lazbm.mongodb.net:27017,slna-shard-00-02-lazbm.mongodb.net:27017/test?ssl=true&replicaSet=SLNA-shard-0&authSource=admin' ||'mongodb://localhost/suciaescena',
	'cloudinary config': process.env.CLOUDINARY_URL || 'cloudinary://333779167276662:_8jbSi9FB3sWYrfimcl8VKh34rI@keystone-demo',

	// 'ssl': true,
	// 'ssl' : 'only',

	// 'ssl cert':'../../etc/letsencrypt/renewal/www.slna.mx.conf',
	// 'ssl port':process.env.PORT || 30001;
	'trust proxy' : true,

	//wysiwyg conf
	'wysiwyg images': true,
	'wysiwyg additional options': "{content_css : 'myLayout.css' }",
	'wysiwyg additional plugins': 'media mediaembed  ',
	'wysiwyg additional buttons': 'media, blockquote '

});

keystone.set('frame guard', false);
keystone.set('cloudinary secure', true);

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server
// keystone.set('baseUrl', 'https://nodevision.com.au/');
keystone.set('baseUrl', 'http://localhost:3010/#!/blog');


keystone.start();
