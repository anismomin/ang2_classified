var db_1 = require('../../db');
var userService = require('../../services/userService');
// user model
var Schema = db_1.default.Schema, passportLocalMongoose = require('passport-local-mongoose');
var userSchema = new Schema({
    username: String,
    email: String,
    password: String
});
//calling path method of user schema
userSchema.path('username').validate(function (value, next) {
    userService.findUser(value, function (err, user) {
        if (err) {
            console.log(err);
            return next(false); // with false value to callback.it say valdation fail
        }
        next(!user); // otherwise we return oposite of truhtiness value of user. if user exist return false  
    });
}, 'That username is already in use');
userSchema.plugin(passportLocalMongoose);
exports.User = db_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map