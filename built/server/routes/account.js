/// <reference path='../../typings/tsd.d.ts' />
var express = require('express'), router = express.Router(), passport = require('passport'), path = require('path');
var passport = require('passport');
var userService = require('../services/userService');
router
    .get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
})
    .get('home', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
})
    .post('/user/register', function (req, res) {
    var userData = req.body;
    userService.addUser(userData, function (err, user) {
        if (err) {
            return res.status(500).json({ err: err });
        }
        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({ status: 'Registration successful!' });
        });
    });
    // User.register(new User({ username: req.body.username, email: req.body.email  }), req.body.password, function(err, account) {
    //   if (err) {
    //     return res.status(500).json({err: err});
    //   }
    //   passport.authenticate('local')(req, res, function () {
    //     return res.status(200).json({status: 'Registration successful!'});
    //   });
    // });
})
    .post('/user/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(500).json({ err: err });
        }
        if (!user) {
            return res.status(401).json({ err: info });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({ err: 'Could not log in user' });
            }
            res.status(200).json({ status: 'Login successful!' });
        });
    })(req, res, next);
}).get('/user/logout', function (req, res) {
    req.logout();
    res.status(200).json({ status: 'Bye!' });
});
module.exports = router;

//# sourceMappingURL=data:application/json;base64,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LHVCQUF1QixFQUFDLENBQUMsQ0FBQztZQUM5RCxDQUFDO1lBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsbUJBQW1CLEVBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUVyQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVMsR0FBRyxFQUFFLEdBQUc7SUFDdEMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6InJvdXRlcy9hY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vLi4vdHlwaW5ncy90c2QuZC50cycgLz5cblxudmFyIGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyksXG4gICAgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKSxcbiAgICBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0JyksXG4gICAgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxudmFyIHBhc3Nwb3J0ID0gcmVxdWlyZSgncGFzc3BvcnQnKTtcbmltcG9ydCB1c2VyU2VydmljZSA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL3VzZXJTZXJ2aWNlJyk7XG4gICAgXG5cbnJvdXRlclxuLmdldCgnLycsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gIHJlcy5zZW5kRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vY2xpZW50JywgJ2luZGV4Lmh0bWwnKSk7XG59KVxuLmdldCgnaG9tZScsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gIHJlcy5zZW5kRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vY2xpZW50JywgJ2luZGV4Lmh0bWwnKSk7XG59KVxuLnBvc3QoJy91c2VyL3JlZ2lzdGVyJywgZnVuY3Rpb24ocmVxLCByZXMpIHtcbiAgXG4gIGxldCB1c2VyRGF0YSA9IHJlcS5ib2R5O1xuXG4gIHVzZXJTZXJ2aWNlLmFkZFVzZXIodXNlckRhdGEsIGZ1bmN0aW9uKGVyciwgdXNlcil7XG4gICAgaWYgKGVycikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyOiBlcnIgfSk7XG4gICAgfVxuICAgIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwnKShyZXEsIHJlcywgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6ICdSZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCEnIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgLy8gVXNlci5yZWdpc3RlcihuZXcgVXNlcih7IHVzZXJuYW1lOiByZXEuYm9keS51c2VybmFtZSwgZW1haWw6IHJlcS5ib2R5LmVtYWlsICB9KSwgcmVxLmJvZHkucGFzc3dvcmQsIGZ1bmN0aW9uKGVyciwgYWNjb3VudCkge1xuICAvLyAgIGlmIChlcnIpIHtcbiAgLy8gICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ZXJyOiBlcnJ9KTtcbiAgLy8gICB9XG4gIC8vICAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdsb2NhbCcpKHJlcSwgcmVzLCBmdW5jdGlvbiAoKSB7XG4gIC8vICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N0YXR1czogJ1JlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsISd9KTtcbiAgLy8gICB9KTtcbiAgLy8gfSk7XG59KVxuLnBvc3QoJy91c2VyL2xvZ2luJywgZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcblxuICBwYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2xvY2FsJywgZnVuY3Rpb24oZXJyLCB1c2VyLCBpbmZvKSB7XG4gICAgXG4gICAgaWYgKGVycikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtlcnI6IGVycn0pO1xuICAgIH1cbiAgICBcbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7ZXJyOiBpbmZvfSk7XG4gICAgfVxuXG4gICAgcmVxLmxvZ0luKHVzZXIsIGZ1bmN0aW9uKGVycikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe2VycjogJ0NvdWxkIG5vdCBsb2cgaW4gdXNlcid9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdGF0dXM6ICdMb2dpbiBzdWNjZXNzZnVsISd9KTtcbiAgICB9KTtcblxuICB9KShyZXEsIHJlcywgbmV4dCk7XG5cbn0pLmdldCgnL3VzZXIvbG9nb3V0JywgZnVuY3Rpb24ocmVxLCByZXMpIHtcbiAgcmVxLmxvZ291dCgpO1xuICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3RhdHVzOiAnQnllISd9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
