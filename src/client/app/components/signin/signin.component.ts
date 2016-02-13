import {Component, EventEmitter} from 'angular2/core'
import {Http, Headers, HTTP_PROVIDERS}  from 'angular2/http'
import {SignInUpService} from '../../services/SignInUpService'

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
	public loginResponse;
	public registerResponse;
	public postResponse;
	public loggedIn = false;

	constructor(private http: Http, private _loginservice: SignInUpService) {

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

	login(loginusername, password) {
		
		let logincreds = {
			username: loginusername.value,
			password: password.value
		};

		this._loginservice.login(logincreds)
			.subscribe(
				data => this.loginResponse = JSON.stringify(data),
				error => this.logError(error),
				() => {
					this.loggedIn = true;
					this.signInUpModal = null;
					console.log(this.loginResponse);
				}
			);
	}

	register(username, regEmail, regPassword) {

		let creds = {
			username: username.value,
			email: regEmail.value,
			password: regPassword.value
		};


		this._loginservice.register(creds)
			.subscribe(
				data => this.registerResponse = JSON.stringify(data),
				error => this.logError(error),
				() => {
					this.loggedIn = true;
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