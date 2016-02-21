///<referance path="../../typings/tsd.d.ts" />
var ristrict = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ristrict;
//# sourceMappingURL=restrict.js.map