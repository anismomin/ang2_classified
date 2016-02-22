//import mongoose = require('mongoose');

import mongoose from '../../db'
import IPosting from './IPosting';

// set type of User Id to ObjectId // but what if want to fill with blank
var Schema = mongoose.Schema;
    //ObjectId = Schema.ObjectId;

export interface IPostingModel extends IPosting, mongoose.Document{};

var PostingSchema = new mongoose.Schema({
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

export let Posting = mongoose.model<IPostingModel>('Posting', PostingSchema);