/// <reference path='../../typings/tsd.d.ts' />
var passport = require('passport');
var passport_local = require('passport-local');
var userService = require('../services/userService');
var passportConf = function () {
    passport.use(new passport_local.Strategy({ usernameField: 'username' }, function (username, password, next) {
        userService.findUser(username, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user || user.password !== password) {
                return next(null, null);
            }
            next(null, user);
        });
        passport.serializeUser(function (user, next) {
            next(null, user.username);
        });
        passport.deserializeUser(function (username, next) {
            userService.findUser(username, function (err, user) {
                next(err, user);
            });
        });
    }));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = passportConf;
//# sourceMappingURL=authConfig.js.map