import mongoose from '../../db'
import IPost from './IPost';

// set type of User Id to ObjectId // but what if want to fill with blank
var Schema = mongoose.Schema;
//ObjectId = Schema.ObjectId;

export interface IPostModel extends IPost, mongoose.Document { };

var PostSchema = new mongoose.Schema({
	user_id: String,
	title: String,
	price: Number,
	category: String,
	description: String,
	images: Array,
	name: String,
	phone: Number,
	state: String,
	city: String,
	status: { type: Boolean, default: false },
	created_at: { type: Date, default: Date.now() }
});

export let Post = mongoose.model<IPostModel>('Post', PostSchema);