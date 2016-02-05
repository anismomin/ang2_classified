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

app.use(account);

// =======================
// Configration ============
// =======================

app.use('/client', express.static(path.join(__dirname, '/../client')));
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use('/bower_components', express.static(path.join(__dirname, '/../bower_components')));
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
app.get('/', function(req, res) {
	res.sendfile(path.resolve(__dirname, '../client/index.html'));
});
app.use('api/v1/posting', postingRoute);
app.use('api/v1/admin', onlyAdmin, adminRoute);

app.use(express.static('built/client'));
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

