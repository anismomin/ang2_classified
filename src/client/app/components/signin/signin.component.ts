import {Component, EventEmitter} from 'angular2/core'
import {Http, Headers, HTTP_PROVIDERS}  from 'angular2/http'
import {SignInUpService} from '../../services/SignInUpService'
import {ControlGroup, FormBuilder, Control, Validators, FORM_DIRECTIVES} from 'angular2/common'
import { UsernameValidator } from './usernameValidator'
import { EmailValidator } from './emailValidator'

import { ValidationService } from '../../services/ValidationService'
	
@Component({
	selector: 'signin-up',
    templateUrl: 'app/components/signin/signin.html',
    inputs : ['signInUpModal'],
    outputs: ['closeSignInUp', 'loginStatusEvent'],
    providers: [SignInUpService, FormBuilder],
    directives: [FORM_DIRECTIVES]

})
export class SignInComponent {

	signInUpModal : any;
	closeSignInUp : EventEmitter<any> = new EventEmitter();
	loginStatusEvent: EventEmitter<any>  = new EventEmitter();
	
	logInStatus : boolean = false;

	fb: FormBuilder
	loginForm: ControlGroup;
	loginUsername: Control;
	loginPassword: Control;

	registerForm: ControlGroup;
	registerUsername: Control;
	registerPassword: Control;
	registerEmail: Control;

	loginResponse : string;
	registerResponse: string;
	postResponse: string;


	constructor(private _http: Http, private _loginservice: SignInUpService, fb: FormBuilder) {
		this.fb = fb;
		this.buildLoginForm();
		this.buildRegisterForm();
	}


	buildLoginForm() :void {

		this.loginUsername = new Control('', Validators.required);
		this.loginPassword = new Control('', Validators.required);

		this.loginForm = this.fb.group({
			'loginUsername': this.loginUsername,
			'loginPassword': this.loginPassword
		});
	}

	submitLoginData() {
		console.log(JSON.stringify(this.loginForm.value))
    }

	buildRegisterForm(): void {

		this.registerUsername = new Control('', Validators.compose([Validators.required, UsernameValidator.startsWithNumber]),
			UsernameValidator.usernameTaken);
		this.registerEmail = new Control('', Validators.required);
		this.registerPassword = new Control('', Validators.required);

		this.registerForm = this.fb.group({
			'registerUsername': this.registerUsername,
			'registerEmail': this.registerEmail,
			'registerPassword': this.registerPassword
		});
	}

	submitRegisterData() {
		console.log(JSON.stringify(this.registerForm.value))
    }

	//Close Sign in Tab
	closeSignInUpModal($event, value) {
		if ($event.target.classList.contains('cd-user-modal')) {
			//this.signInUpModal = null;	
			this.closeSignInUp.emit(value);
			return;
		}
	}

	//Sign In Tabs
	showSignIn() {
		this.signInUpModal = true;
		return;
	}		
 	//Sign In Tabs
	showSignUp(){		
		this.signInUpModal = false;
		return;
	}

	// Make Login Http Request
	login(loginData) {
		
		if (this.loginForm.dirty && this.loginForm.valid) {
			let logincreds = {
				username: loginData.loginUsername,
				password: loginData.loginPassword
			};

			this._loginservice.login(logincreds)
				.subscribe(
				data => this.loginResponse = JSON.stringify(data),
				error => this.logError(error),
				() => {
					this.logInStatus = true;
					this.signInUpModal = null;
					this.loginStatusEvent.emit(true);
					console.log(this.loginResponse);
				}
				);
		}
	}

	// Make Register Http Request
	register(registerData) {

		if (this.registerForm.dirty && this.registerForm.valid) {
			let creds = {
				username: registerData.registerUsername,
				email: registerData.registerEmail,
				password: registerData.registerPassword
			};

			this._loginservice.register(creds)
				.subscribe(
				data => this.registerResponse = JSON.stringify(data),
				error => this.logError(error),
				() => {
					this.logInStatus = true;
					this.signInUpModal = null;
					console.log(this.registerResponse);
				}
				);
		}
	}

	getpost() {
		this._loginservice.getpost()
			.subscribe(
			data => this.postResponse = JSON.stringify(data),
			error => this.logError(error),
			() => console.log('FINISH')
			);
	}
	
	logError(error) {
		console.log(error);
	}

}