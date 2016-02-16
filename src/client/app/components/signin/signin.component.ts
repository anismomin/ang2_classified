import {Component, EventEmitter} from 'angular2/core'
import {Http, Headers, HTTP_PROVIDERS}  from 'angular2/http'
import {SignInUpService} from '../../services/SignInUpService'
import {ControlGroup, FormBuilder, Validators, FORM_DIRECTIVES} from 'angular2/common'
import { UsernameValidator } from './usernameValidator'

@Component({
	selector: 'signin-up',
    templateUrl: 'app/components/signin/signin.html',
    inputs : ['signInUpModal'],
    outputs: ['closeSignInUp', 'loginStatusEvent'],
    providers:[SignInUpService],
    directives: [FORM_DIRECTIVES]

})
export class SignInComponent {

	public signInUpModal : any;
	public closeSignInUp : EventEmitter<any> = new EventEmitter();
	public loginStatusEvent: EventEmitter<any>  = new EventEmitter();
	
	public logInStatus : boolean = false;
	public loginForm: ControlGroup;
	public registerForm: ControlGroup;

	public loginResponse : string;
	public registerResponse: string;
	public postResponse: string;


	constructor(private _http: Http, private _loginservice: SignInUpService, private _formBuilder: FormBuilder) {
		
		this.loginForm = this._formBuilder.group({
			'loginUsername': ['', 
				Validators.compose([Validators.required, UsernameValidator.startsWithNumber]),
				UsernameValidator.usernameTaken
			],
			'loginPassword': ['', Validators.required]
		});

		this.registerForm = this._formBuilder.group({
			'registerUsername': ['', Validators.required],
			'registerEmail': ['', Validators.required],
			'registerPassword': ['', Validators.required]
		});
		
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

	// Make Register Http Request
	register(registerData) {

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