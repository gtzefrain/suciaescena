/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var _ = require('lodash'),
	keystone = require('keystone'),
	middleware = require('./middleware'),
	importRoutes = keystone.importer(__dirname);
	express = require('express');
	app = express()
	sitemap = require('keystone-express-sitemap');
	prerender = require('prerender-node');
	



// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
	ang_mat: importRoutes('./ang_mat'),
	ang_bootm: importRoutes('./ang_bootm')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	// Views
	app.get('/sitemap.xml', function(req, res) {
		sitemap.create(keystone, req, res, {
        ignore: ['^\/api.*$']
    });
		sitemap.create(keystone, req, res);
	});

	app.use(prerender.set('prerenderToken', 'P0duudxFrGNFUGmh8FQt').set('protocol', 'https'));

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

	// app.all('/api*', keystone.initCORS);

	app.get('/api/post/list', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.list);
	app.all('/api/post/create', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.create);
	app.get('/api/post/:slug', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.get);
	app.all('/api/post/:id/update', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.update);
	app.get('/api/post/:id/remove', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.remove);

	app.get('/api/post-category/list', [keystone.middleware.api, keystone.middleware.cors], routes.api.post_categories.list);
	app.get('/api/post-category/:key', [keystone.middleware.api, keystone.middleware.cors], routes.api.post_categories.get);

	app.get('/api/post-by-category/:key', [keystone.middleware.api, keystone.middleware.cors], routes.api.post_by_category.list);

	app.get('/api/gallery/list', [keystone.middleware.api, keystone.middleware.cors], routes.api.galleries.list);
	app.get('/api/gallery/:key', [keystone.middleware.api, keystone.middleware.cors], routes.api.galleries.get);

	app.get('/api/enquiry/list', [keystone.middleware.api, keystone.middleware.cors], routes.api.enquiries.list);
	app.all('/api/enquiry/create', [keystone.middleware.api, keystone.middleware.cors], routes.api.enquiries.create);
	app.all('/api/enquiry/:id/update', [keystone.middleware.api, keystone.middleware.cors], routes.api.enquiries.update);
	app.get('/api/enquiry/:id/remove', [keystone.middleware.api, keystone.middleware.cors], routes.api.enquiries.remove);

	app.get('/api/enquiry_type/list', [keystone.middleware.api, keystone.middleware.cors], routes.api.enquiry_types.list);
	app.get('/api/enquiry_type/:value', [keystone.middleware.api, keystone.middleware.cors], routes.api.enquiry_types.get);

	// App Routes for Angular Material Project
	app.get('/ang_mat', [keystone.middleware.api, keystone.middleware.cors], routes.ang_mat.app);
	app.get('/ang_mat/blog', [keystone.middleware.api, keystone.middleware.cors], routes.ang_mat.blog);
	app.get('/ang_mat/post', [keystone.middleware.api, keystone.middleware.cors], routes.ang_mat.post);
	app.get('/ang_mat/gallery', [keystone.middleware.api, keystone.middleware.cors], routes.ang_mat.gallery);
	app.get('/ang_mat/contact', [keystone.middleware.api, keystone.middleware.cors], routes.ang_mat.contact);

	// // App Routes for Angular Bootstrap Material Project
	// app.get('/ang_bootm', [keystone.middleware.api, keystone.middleware.cors], routes.ang_bootm.app);
	// app.get('/ang_bootm/blog', [keystone.middleware.api, keystone.middleware.cors], routes.ang_bootm.blog);
	// app.get('/ang_bootm/post', [keystone.middleware.api, keystone.middleware.cors], routes.ang_bootm.post);
	// app.get('/ang_bootm/gallery', [keystone.middleware.api, keystone.middleware.cors], routes.ang_bootm.gallery);
	// app.get('/ang_bootm/contact', [keystone.middleware.api, keystone.middleware.cors], routes.ang_bootm.contact);
	//
	app.get('/google8d4749e9ba0e7fa7.html', function (req, res) {
		res.sendFile(path.join(__dirname, '../public', 'google8d4749e9ba0e7fa7.html' ));
	})

	app.get('/*', routes.ang_mat.app , function(req, res) {
    res.render('/blog');
  });

	// app.all("/*", [keystone.middleware.api, keystone.middleware.cors] , routes.ang_mat.blog)
	//
	// app.use('/js', __dirname + '/js');
	// app.use('/dist', __dirname + '/../dist');
	// app.use('/css', __dirname + '/css');
	// app.use('/partials', __dirname + '/partials'	);
};
// app.get('/*', function(req, res){
// 	console.log('epa');
// 	res.sendfile( indexPath + '/index.html' );
// });
