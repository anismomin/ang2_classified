System.register([], function(exports_1) {
    var UsernameValidator, EmailValidator;
    return {
        setters:[],
        execute: function() {
            UsernameValidator = (function () {
                function UsernameValidator() {
                }
                UsernameValidator.startsWithNumber = function (control) {
                    if (control.value != "" && !isNaN(control.value.charAt(0))) {
                        return { "startsWithNumber": true };
                    }
                    return null;
                };
                UsernameValidator.usernameTaken = function (control) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            if (control.value === "anismomin") {
                                resolve({ "usernameTaken": true });
                            }
                            else {
                                resolve(null);
                            }
                            ;
                        }, 1000);
                    });
                };
                return UsernameValidator;
            })();
            exports_1("UsernameValidator", UsernameValidator);
            EmailValidator = (function () {
                function EmailValidator() {
                }
                EmailValidator.validEmail = function (control) {
                    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
                    if (control.value != "" && !EMAIL_REGEXP.test(control.value)) {
                        return { "invalidEmail": true };
                    }
                };
                return EmailValidator;
            })();
            exports_1("EmailValidator", EmailValidator);
        }
    }
});
//# sourceMappingURL=usernameValidator.js.map