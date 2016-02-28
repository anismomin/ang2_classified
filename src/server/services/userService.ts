import {IUserModel, User} from '../models/user/User';

export let addUser = function(user, next) {
	var newUser = new User({
		username: user.username,
		email: user.email.toLowerCase(),
		password: user.password,
		status: true
	});

	newUser.save(function(err) {
		if (err) {
			return next(err);
		}
		next(null);
	});
};

export let findUser = function(username, next) {
	//findOne is also available in mongo shell and native driver
	User.findOne({ username: username }, function(err, user) {
		//passing both err and user to next callback
		next(err, user);
	})
};

