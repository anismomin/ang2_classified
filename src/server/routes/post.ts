/// <reference path='../../typings/tsd.d.ts' />

import express = require('express');
import path = require('path');
var methodOverride = require('method-override');
var multer = require('multer');
var router = express.Router();

import {IUserModel, User} from '../models/user/User';
import {IPostModel, Post} from '../models/post/Post';

var storage = multer.diskStorage({
	destination: './built/client/uploads/',
	filename: function(req, file, cb) {
        cb(null, (Math.random().toString(36) + '00000000000000000').slice(2, 10) + Date.now() + path.extname(file.originalname));
	}
});
var upload = multer({ storage: storage });
router.use(methodOverride(function(req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		var method = req.body._method
		delete req.body._method
		return method
	}
}))

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
.get('/', (req: express.Request, res: express.Response) => {
	//Post.find({ status: true }, (err, docs) => {
	Post.find({}, (err, docs) => {
		res.status(200).json(docs);					
	});
})
.post('/upload', upload.array('uploads', 12), (req: express.Request, res: express.Response, next) => {	
    res.status(200).json(req.files);	
})
//.post('/create', upload.array('images', 12), (req: express.Request, res: express.Response, next) => {	
.post('/create',  (req: express.Request, res: express.Response, next) => {
	console.log(req.body);
	let b = req.body;
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
		images: b.images,
		name: b.name,
		phone: b.phone,
		state: b.state,
		city: b.city
	});
	console.log(post);
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

		(err) => res.status(301).json(err);
		res.status(200).json(docs);	
		
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
