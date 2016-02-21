var User_1 = require('../models/users/User');
exports.addUser = function (user, next) {
    var newUser = new User_1.User({
        username: user.username,
        email: user.email.toLowerCase(),
        password: user.password,
    });
    newUser.save(function (err) {
        if (err) {
            return next(err);
        }
        next(null);
    });
};
exports.findUser = function (username, next) {
    //findOne is also available in mongo shell and native driver
    User_1.User.findOne({ username: username }, function (err, user) {
        //passing both err and user to next callback
        next(err, user);
    });
};
//# sourceMappingURL=userService.js.map