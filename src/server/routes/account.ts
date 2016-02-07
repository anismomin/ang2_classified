/// <reference path='./../../typings/tsd.d.ts' />

import express = require('express');
import bodyParser = require('body-parser');
import path = require('path');

import session = require('express-session');
var crypto = require('crypto');
var methodOverride = require('method-override'); 
import flash = require('connect-flash');
var router = express.Router();
import {IUserModel, User} from '../models/User';

function hash(password) {
	return crypto.createHash('sha256').update(password).digest('hex');
}

express().set('superSecret', 'itsSuperasecret');

router
.use(bodyParser.json())
.use(methodOverride(function(req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
	}
}))
.use(bodyParser.urlencoded({ extended: false }))
.use(session({
	genid: function(req) {
		return (Date.now().toString()) // use UUIDs for session IDs 
	},
	secret: 'asdsae324h2h4n2kh42nh4n456kh45l09wuc220230ymc80m',
	resave: false,
	saveUninitialized: true
}))
.use(flash())
.get('/', (req, res) => {

	res.sendfile(path.resolve(__dirname, '../../client/index.html'));

}).post('/', (req: express.Request, res: express.Response, next) => {
	
	let userdata = {
		email: req.body.email,
		password: hash(req.body.password)
	};

	User.findOne(userdata, function(err, user) {
		
		if(user){
			req.session['user_id'] = user._id;
			req.session["isLogin"] = true;
			req.session["user"] = user;

			let passUser = {
				_id: user._id,
				username: user.username,
				email: user.email,
				admin: user.admin,
				status: user.status
			};

			res.json({ success: true, message: 'Successfully loged In!', user: passUser });

			// if (user.admin) {
			// 	req.flash("info", "Welcome Admin !");
			// 	res.redirect("/admin");
			// } else {
			// 	req.flash("info", "Welcome User hope you are fine!");
			// 	res.redirect("/");
			// }

		} else {

			res.json({ success: false, message: 'Failed to login!', error: 'Credentials not match with record!' });

		}

	});

})
.get('/register', (req: express.Request, res: express.Response) => {

		let vm = {
			title: 'Register'
		}
		req.flash("info", "Welcome User hope you are fine!");
		res.render('signup', vm);

})
.post('/register', (req: express.Request, res: express.Response, next) => {

		var b = req.body;
		
		console.log(b);

		if (b.password !== b.cpassword) {
			
			res.json({ success: false, message: 'The passwords do not match' });
		
		} else {

			User.findOne({ username: b.username.toLowerCase() }, function(err, user) {

				if(!user) {

					User.findOne({ email: b.email.toLowerCase() }, function(err, user) {

						let userdata = {
							username: b.username.toLowerCase(),
							email: b.email.toLowerCase(),
							admin: false,
							status: false,
							password: hash(b.password)
						};

						if (b.email == 'anis_momin@hotmail.com' || b.email == 'anismomin@hotmail.com') {
							userdata.admin = true;
							userdata.status = true;
						}

						if (!user) {

							let newUser: IUserModel = new User(userdata);

							newUser.save(function(err) {
								if (err) {
									return next(err);
								}

								req.session['user_id'] = newUser._id;
								req.session["isLogin"] = true;
								req.session["user"] = newUser;


								res.json({ success: true, message: 'Successfully Register!', user: newUser });

								//res.redirect("/");
							});

						} else {

							// var vm = {
							// 	title: 'Register',
							// 	input: req.body,
							// 	error: new Error('The Email you entered already exists!')
							// };

							res.json({ success: false, message: 'The Email you entered already exists!' });

							// res.render('signup', vm);
						}

					});


				} else {

					res.json({ success: false, message: 'The Username is already in exist.' });					
				};
			
			}

			
		};

		

})
.get('/logout', (req, res) => {

	delete req.session['user_id']; 
	delete req.session["isLogin"];
	delete req.session["user"];

	res.json({ success: true, message: 'Successfully Logout' });					

	//res.redirect('/login');

})
.use(function(req, res, next) {
	res.locals.errors = req.flash("error");
	res.locals.infos = req.flash("info");
	next();
})
.use((req, res, next) => {
	
	if (req.session['user_id']) {
			
		User.findOne({ _id: req.session['user_id'] }, function(err, user) {
			if (user) {
				req.user = user;
				res.locals.user = user;
			}
			next();
		});

	} else {

		next();
	}

});

export  = router;