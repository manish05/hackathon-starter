/**
 * Module dependencies.
 */

var express = require('express');
var flash = require('connect-flash');
var less = require('less-middleware');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var fs = require('fs');

/**
 * Load controllers.
 */

var homeController = require('./controllers/home');
var userController = require('./controllers/user');
var apiController = require('./controllers/api');
var contactController = require('./controllers/contact');

/**
 * API keys + Passport configuration.
 */

var secrets = require('./config/secrets');
var passportConf = require('./config/passport');

/**
 * Mongoose configuration.
 */

mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.log('✗ MongoDB Connection Error. Please make sure MongoDB is running.'.red);
  setTimeout(function() {
    mongoose.connect(secrets.db);
  }, 5000);
});

var app = express();

/**
 * Express configuration.
 */
app.locals.cacheBuster = Date.now();
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(expressValidator());
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret code' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(flash());
app.use(less({ src: __dirname + '/public', compress: true }));
app.use(app.router);
app.use(express.static( path.join(__dirname, 'public'), { maxAge: 864000000 } ));
app.use(function(req, res) {
  res.render('404', { status: 404 });
});
app.use(express.errorHandler());

/**
 * Application routes.
 */

app.get('/', homeController.index);

//for hack 4 good
/*
app.get('/upload', function(req, res) {
    
     res.send('<form method="post" action="/upload" enctype="multipart/form-data">'
    + '<p>Image: <input type="file" name="uploadfile" /></p>'
    + '<p><input type="submit" value="Upload" /></p>'
    + '</form>');
});*/
app.all('/upload', function(req, res){
        var temp_path = req.files.uploadfile.path;
     var save_path = './public/images/' + req.files.uploadfile.name;
     
     fs.rename(temp_path, save_path, function(error){
     	if(error) throw error;
     	
     	fs.unlink(temp_path, function(){
     		if(error) throw error;
     		res.send("File uploaded to: " + save_path);
     	});
     	
     });        
});


app.get('/gurus', homeController.gurus);
app.get('/mannat', homeController.mannat);
app.get('/donate', homeController.donate);
app.get('/testimonials', homeController.testimonials);

app.post('/mannatData',function(req,res){
	if(res.locals.user == req.user){
		var file = __dirname + '/public/data.json';
		var data= require(file);
		var purchased = req.body.purchased,
		
		data = JSON.parse(data);
		data=data.data;
		purchased= JSON.parse(purchased);
		for(var i=0;i<purhased.length;i++){
			var curObj=JSON.parse(purchased[i]);
			data[curObj.i][curObj.j]=curObj.data;
		}
		
		fs.writeFile(file, data, function (err) {
		  if (err) return console.log(err);
		});
		
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write("Success");	
	}	
});

app.get('/mannatData',function(req,res){

	var file = __dirname + '/public/data.json';
	var data= require(file);
	data.replace(/(['"])?([a-zA-Z0-9]+)(['"])?:/g, '"$2":'); //add quotes to keys
	data=JSON.parse(data);
	data=data.data;
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write(JSON.stringify(data));
});

app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConf.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);
app.get('/api', apiController.getApi);
app.get('/api/foursquare', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getFoursquare);
app.get('/api/tumblr', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getTumblr);
app.get('/api/facebook', passportConf.isAuthenticated, apiController.getFacebook);
app.get('/api/scraping', apiController.getScraping);
app.get('/api/github', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getGithub);
app.get('/api/lastfm', apiController.getLastfm);
app.get('/api/nyt', apiController.getNewYorkTimes);
app.get('/api/twitter', passportConf.isAuthenticated, apiController.getTwitter);
app.get('/api/aviary', apiController.getAviary);
app.get('/api/paypal', apiController.getPayPal);
app.get('/api/paypal/success', apiController.getPayPalSuccess);
app.get('/api/paypal/cancel', apiController.getPayPalCancel);
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/foursquare', passport.authorize('foursquare'));
app.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), function(req, res) { res.redirect('/api/foursquare'); });
app.get('/auth/tumblr', passport.authorize('tumblr'));
app.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), function(req, res) { res.redirect('/api/tumblr'); });

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
