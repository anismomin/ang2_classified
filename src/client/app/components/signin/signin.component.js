System.register(['angular2/core', 'angular2/http', '../../services/SignInUpService', 'angular2/common', './usernameValidator', './emailValidator'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, SignInUpService_1, common_1, usernameValidator_1, emailValidator_1;
    var SignInComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (SignInUpService_1_1) {
                SignInUpService_1 = SignInUpService_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (usernameValidator_1_1) {
                usernameValidator_1 = usernameValidator_1_1;
            },
            function (emailValidator_1_1) {
                emailValidator_1 = emailValidator_1_1;
            }],
        execute: function() {
            SignInComponent = (function () {
                function SignInComponent(_http, _loginservice, fb) {
                    this._http = _http;
                    this._loginservice = _loginservice;
                    this.closeSignInUp = new core_1.EventEmitter();
                    this.loginStatusEvent = new core_1.EventEmitter();
                    this.logInStatus = false;
                    this.fb = fb;
                    this.buildLoginForm();
                    this.buildRegisterForm();
                }
                SignInComponent.prototype.buildLoginForm = function () {
                    this.loginUsername = new common_1.Control('', common_1.Validators.required);
                    this.loginPassword = new common_1.Control('', common_1.Validators.required);
                    this.loginForm = this.fb.group({
                        'loginUsername': this.loginUsername,
                        'loginPassword': this.loginPassword
                    });
                };
                SignInComponent.prototype.submitLoginData = function () {
                    console.log(JSON.stringify(this.loginForm.value));
                };
                SignInComponent.prototype.buildRegisterForm = function () {
                    this.registerUsername = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, usernameValidator_1.UsernameValidator.startsWithNumber]), usernameValidator_1.UsernameValidator.usernameTaken);
                    this.registerEmail = new common_1.Control('', common_1.Validators.compose([emailValidator_1.EmailValidator.validEmail, common_1.Validators.required]));
                    this.registerPassword = new common_1.Control('', common_1.Validators.required);
                    this.registerForm = this.fb.group({
                        'registerUsername': this.registerUsername,
                        'registerEmail': this.registerEmail,
                        'registerPassword': this.registerPassword
                    });
                };
                SignInComponent.prototype.submitRegisterData = function () {
                    console.log(JSON.stringify(this.registerForm.value));
                };
                //Close Sign in Tab
                SignInComponent.prototype.closeSignInUpModal = function ($event, value) {
                    if ($event.target.classList.contains('cd-user-modal')) {
                        //this.signInUpModal = null;	
                        this.closeSignInUp.emit(value);
                        return;
                    }
                };
                //Sign In Tabs
                SignInComponent.prototype.showSignIn = function () {
                    this.signInUpModal = true;
                    return;
                };
                //Sign In Tabs
                SignInComponent.prototype.showSignUp = function () {
                    this.signInUpModal = false;
                    return;
                };
                // Make Login Http Request
                SignInComponent.prototype.login = function (loginData) {
                    var _this = this;
                    if (this.loginForm.dirty && this.loginForm.valid) {
                        var logincreds = {
                            username: loginData.loginUsername,
                            password: loginData.loginPassword
                        };
                        this._loginservice.login(logincreds)
                            .subscribe(function (data) { return _this.loginResponse = JSON.stringify(data); }, function (error) { return _this.logError(error); }, function () {
                            _this.logInStatus = true;
                            _this.signInUpModal = null;
                            _this.loginStatusEvent.emit(true);
                            console.log(_this.loginResponse);
                        });
                    }
                };
                // Make Register Http Request
                SignInComponent.prototype.register = function (registerData) {
                    var _this = this;
                    if (this.registerForm.dirty && this.registerForm.valid) {
                        var creds = {
                            username: registerData.registerUsername,
                            email: registerData.registerEmail,
                            password: registerData.registerPassword
                        };
                        this._loginservice.register(creds)
                            .subscribe(function (data) { return _this.registerResponse = JSON.stringify(data); }, function (error) { return _this.logError(error); }, function () {
                            _this.logInStatus = true;
                            _this.signInUpModal = null;
                            console.log(_this.registerResponse);
                        });
                    }
                };
                SignInComponent.prototype.getpost = function () {
                    var _this = this;
                    this._loginservice.getpost()
                        .subscribe(function (data) { return _this.postResponse = JSON.stringify(data); }, function (error) { return _this.logError(error); }, function () { return console.log('FINISH'); });
                };
                SignInComponent.prototype.logError = function (error) {
                    console.log(error);
                };
                SignInComponent = __decorate([
                    core_1.Component({
                        selector: 'signin-up',
                        templateUrl: 'app/components/signin/signin.html',
                        inputs: ['signInUpModal'],
                        outputs: ['closeSignInUp', 'loginStatusEvent'],
                        providers: [SignInUpService_1.SignInUpService, common_1.FormBuilder],
                        directives: [common_1.FORM_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, SignInUpService_1.SignInUpService, common_1.FormBuilder])
                ], SignInComponent);
                return SignInComponent;
            })();
            exports_1("SignInComponent", SignInComponent);
        }
    }
});
//# sourceMappingURL=signin.component.js.map