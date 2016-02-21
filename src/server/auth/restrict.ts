///<referance path="../../typings/tsd.d.ts" />

let ristrict = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

export default ristrict;