///<referance path="../../typings/tsd.d.ts" />
var ristrict = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ristrict;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGgvcmVzdHJpY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOENBQThDO0FBRTlDLElBQUksUUFBUSxHQUFHLFVBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO0lBQ3JDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFBO0FBRUQ7a0JBQWUsUUFBUSxDQUFDIiwiZmlsZSI6ImF1dGgvcmVzdHJpY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJhbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cblxubGV0IHJpc3RyaWN0ID0gZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcblx0aWYgKHJlcS5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuXHRcdHJldHVybiBuZXh0KCk7XG5cdH1cblx0cmVzLnJlZGlyZWN0KCcvJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJpc3RyaWN0OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
