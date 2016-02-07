// =======================
// reference TDS files ============
// =======================

/// <reference path='../typings/tsd.d.ts' />


// =======================
// get the packages we need ============
// =======================

import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");

import express = require('express');
var app: express.Express = express();
import path = require('path');
import morgan = require('morgan');
import http = require('http');
import mongoose = require('mongoose');
var hash : any = require('bcryptjs');

import flash = require('connect-flash');

app.set('port', (process.env.PORT || 3100));

var server = http.createServer(app);

// =======================
// Routers ============
// =======================
import account = require('./routes/account');
import postingRoute = require('./routes/posting');
import adminRoute = require('./routes/admin');



// =======================
// Configration ============
// =======================
//app.use(express.static('built/client'));
app.use('/client', express.static(path.join(__dirname, '/../client')));
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
app.use(morgan('dev')); 


// =======================
// Route Authenticatoin Helper ============
// =======================
function auth(req, res, next) {
	if (!req.user) {
		//res.redirect('/login');
		res.json({ success: false, message: 'Your are not loged in.' })
	} else {
		next();
	}
} 

function onlyAdmin(req, res, next) {
	if (!req.user || !req.user.admin) {
		//res.redirect('/');

		res.json({ success: false, message: 'Not Authorized to access this page.'})
	} else {
		next();
	}
} 

// =======================
// Routes ============
// =======================
// Simple Routes


// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
// });

var allowCrossDomain = function(req, res, next) {
    if ('OPTIONS' == req.method) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With');
		res.send(200);
    }
    else {
		next();
    }
};

app.use(allowCrossDomain);

app.use(account);
app.use('api/v1/posting', postingRoute);
app.use('api/v1/admin', onlyAdmin, adminRoute);


// Simple Routes

// =======================
// Server Start ============
// =======================
// var port: number = process.env.PORT | 3000;


// var server = app.listen(app.get('port'), () => {
// 	var listeningPort: number = server.address().port;
// 	console.log('The server is listening on port: ' + listeningPort);
// });


server.listen(app.get('port'), 'localhost');
server.on('listening', function() {
	console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});

