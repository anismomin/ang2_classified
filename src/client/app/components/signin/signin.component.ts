import {Component, EventEmitter} from 'angular2/core'
import {Http, Headers, HTTP_PROVIDERS}  from 'angular2/http'

import {ControlGroup, FormBuilder, Validators, FORM_DIRECTIVES, AbstractControl} from 'angular2/common'

import {SignInUpService} from '../../services/SignInUpService'
import {ControlMessages} from '../controlMessage/control-messages.component'
import {ValidationService} from '../../services/validationService'

@Component({
	selector: 'signin-up',
    templateUrl: 'app/components/signin/signin.html',
    inputs : ['signInUpModal'],
    outputs: ['closeSignInUp', 'loginStatusEvent'],
    providers: [SignInUpService],
    directives: [FORM_DIRECTIVES, ControlMessages]
})
export class SignInComponent {

	signInUpModal : any;
	closeSignInUp : EventEmitter<any> = new EventEmitter();
	loginStatusEvent: EventEmitter<any>  = new EventEmitter();
	
	logInStatus : boolean = false;

	loginForm: ControlGroup;
	registerForm: ControlGroup;
	

	loginResponse : string;
	registerResponse: string;
	postResponse: string;

	loginFormProcess: boolean = true;
	registerFormProcess: boolean = true;


	constructor(private _http: Http, private _loginservice: SignInUpService, private fb: FormBuilder) {
		this.fb = fb;
		this.buildLoginForm();
		this.buildRegisterForm();	
	}


	buildLoginForm() :void {
		
		this.loginForm = this.fb.group({
			'loginUsername': ['', Validators.compose([Validators.required, ValidationService.startsWithNumber])],
			'loginPassword': ['', Validators.compose([Validators.required, ValidationService.passwordValidator])]
		});
	}

	submitLoginData() {
		console.log(JSON.stringify(this.loginForm.value))
    }

	buildRegisterForm(): void {
		this.registerForm = this.fb.group({
			'registerUsername': ['', Validators.compose([Validators.required, ValidationService.startsWithNumber]), ValidationService.usernameTaken],
			'registerEmail': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
			'registerPassword': ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
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
      //       this.buildLoginForm();
		    // this.buildRegisterForm();
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

			//this.loginFormProcess = true;

			this._loginservice.login(logincreds)
				.subscribe(
				data => this.loginResponse = JSON.stringify(data),
				error => this.logError(error),
				() => {
					this.logInStatus = true;
					this.signInUpModal = null;
					this.loginStatusEvent.emit(true);
					//this.loginFormProcess = false;
               //      this.buildLoginForm();
		             // this.buildRegisterForm();
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
			//this.registerFormProcess = true;

			this._loginservice.register(creds)
				.subscribe(
				data => this.registerResponse = JSON.stringify(data),
				error => this.logError(error),
				() => {
					this.logInStatus = true;
					this.signInUpModal = null;
					this.loginStatusEvent.emit(true);
					//this.registerFormProcess = false;
					 // this.buildLoginForm();
					 // this.buildRegisterForm();
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