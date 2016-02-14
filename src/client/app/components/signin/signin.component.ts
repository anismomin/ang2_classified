import {Component, EventEmitter} from 'angular2/core'
import {Http, Headers, HTTP_PROVIDERS}  from 'angular2/http'
import {SignInUpService} from '../../services/SignInUpService'
import {ControlGroup, FormBuilder, Validators} from 'angular2/common'

@Component({
	selector: 'signin-up',
    templateUrl: 'app/components/signin/signin.html',
    inputs : ['signInUpModal'],
    outputs: ['closeSignInUp'],
    providers:[SignInUpService]

})
export class SignInComponent {

	public signInUpModal;
	public closeSignInUp = new EventEmitter();
	
	public logInStatus = false;
	public loginForm: ControlGroup;
	public registerForm: ControlGroup;

	public loginResponse;
	public registerResponse;
	public postResponse;


	constructor(private _http: Http, private _loginservice: SignInUpService, private _formBuilder: FormBuilder) {
		
		this.loginForm = this._formBuilder.group({
			'loginUsername' : ['', Validators.required],
			'loginPassword': ['', Validators.required]
		});

		this.registerForm = this._formBuilder.group({
			'registerUsername': ['', Validators.required],
			'registerEmail': ['', Validators.required],
			'registerPassword': ['', Validators.required]
		});
	}

	closeSignInUpModal($event, value) {
		if ($event.target.classList.contains('cd-user-modal')) {
			//this.signInUpModal = null;	
			this.closeSignInUp.emit(value);
			return;
		}
	}

	showSignIn(){
		this.signInUpModal = true;
		return;
	}

	showSignUp(){
		this.signInUpModal = false; 
		return;
	}

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

					console.log(this.loginResponse);
				}
			);
	}

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