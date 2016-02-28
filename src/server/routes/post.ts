/// <reference path='../../typings/tsd.d.ts' />

import express = require('express');
import path = require('path');
var methodOverride = require('method-override');
// var multer = require('multer');
// var crypto = require('crypto');
var router = express.Router();

import {IUserModel, User} from '../models/user/User';
import {IPostModel, Post} from '../models/post/Post';

// var storage = multer.diskStorage({
// 	destination: '../../../uploads/',
// 	filename: function(req, file, cb) {
// 		crypto.pseudoRandomBytes(16, function(err, raw) {
// 			if (err) return cb(err)
// 			cb(null, raw.toString('hex') + path.extname(file.originalname))
// 		})
// 	}
// });
router.use(methodOverride(function(req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		var method = req.body._method
		delete req.body._method
		return method
	}
}))
.get('/', (req: express.Request, res: express.Response) => {
	//Post.find({ status: true }, (err, docs) => {
	Post.find({}, (err, docs) => {
		res.status(200).json(docs);					
	});
})
//.post('/create', upload.array('images', 12), (req: express.Request, res: express.Response, next) => {	
.post('/create',  (req: express.Request, res: express.Response, next) => {

	let b = req.body;
	//var images = req.files;
	var imgArray = [];

	// var images = [{
	// 	path: './images/image.jpg',
	// 	filename: 'banana'
	// },
	// {
	// 	path: './images/image2.jpg',
	// 	filename: 'banana2'
	// }];

	// images.forEach(function(file) {
	// 	imgArray.push({
	// 		path: file.path,
	// 		filename: file.filename
	// 	});
	// });
	var userId = '56ce79ee63b678a005c44b5c';

	// if (req.session["isLogin"] ) {
	// 	userId = req.session["user"]._id.toString();	
	// } 
	let post: IPostModel = new Post({
		user_id: userId,
		title: b.title,
		category: b.category,
		price: b.price,
		description: b.description,
		images: imgArray,
		name: b.name,
		phone: b.phone,
		state: b.state,
		city: b.city
	});
	post.save(function(err) {
		if (err) {			
			res.json({ success: false, error: err });
			return;	
		}
		res.json({ success: true, message: 'Successfully Post an Advertsment.' });
	});

})
.get('/my', (req: express.Request, res: express.Response) => {

	Post.find({}, (err, docs) => {

		var posts = [];
			
		var user = req.session["user"];

		if (req.session["isLogin"] && !user.admin) {
			for (var i = 0; i < docs.length; i++) {
				if (req.session["user"]._id == docs[i].user_id) {
					posts.push(docs[i]);
				}
			}
		} else {
			for (var i = 0; i < docs.length; i++) {
				if (docs[i].status == true) {
					posts.push(docs[i]);
				}
			}
		}
		
		res.json({ success: true, data: posts });
	});

})
.get('/:id' , (req: express.Request, res: express.Response) => {

	Post.findOne({ _id: req.params.id }, (err, docs) => {

		res.json({ success: true, data: docs });

	});

})
.get('/:post_id/edit', (req: express.Request, res: express.Response) => {

	Post.findOne({ _id: req.params.post_id }, (err, docs) => {

		if(err) {
			res.json({ success: false, error: err });	
			return;		
		}
		res.json({ success: true, data: docs });
	});

})
.put('/:post_id', (req, res) => {

	var b = req.body;

	Post.update(
	{
		_id: req.params.post_id
	},
	{
		title: b.title,
		category: b.category,
		price: b.price,
		description: b.description,
		name: b.name,
		phone: b.phone,
		state: b.state,
		city: b.city,
	},
	(err, post) => {

		res.json({ success: true, message: 'Successfully Update Post', data: post });		
		//res.redirect(req.params.post_id);
	});

})
.delete('/:post_id', (req, res) => {

	var b = req.body;
	Post.update(
	{
		_id: req.params.post_id
	},
	{
		title: b.title,
		category: b.category,
		price: b.price,
		description: b.description,
		name: b.name,
		phone: b.phone,
		state: b.state,
		city: b.city,
	},
	(err, post) => {
		res.json({ success: true, message: 'Successfully Deleted the Post.'});
	});

});

export  = router;
