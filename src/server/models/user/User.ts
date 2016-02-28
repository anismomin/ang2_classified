
import mongoose from '../../db';
import IUser from './IUser'
import userService = require('../../services/userService');
export interface IUserModel extends IUser, mongoose.Document { }

// user model
var Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  	username: String,
  	email: String,
  	password: String,
	status: { type: Boolean, default: true },
	created_at: { type: Date, default: Date.now() }
});

//calling path method of user schema
userSchema.path('username').validate(function(value, next) {
	userService.findUser(value, function(err, user) {
		if (err) {
			console.log(err);
			return next(false); // with false value to callback.it say valdation fail
		}
		next(!user) // otherwise we return oposite of truhtiness value of user. if user exist return false  
	});
}, 'That username is already in use');

userSchema.plugin(passportLocalMongoose);

export let User = mongoose.model<IUserModel>('User', userSchema);



