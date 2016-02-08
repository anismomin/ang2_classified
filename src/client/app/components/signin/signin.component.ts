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

	login(email, password){
		
		var creds = JSON.stringify({
			email: email.value,
			password: password.value
		});

		this._loginservice.login(creds)
			.subscribe(
				data => this.loginResponse = JSON.stringify(data),
				error => this.logError(error),
				() => console.log('FINISH')
			);
	}

	register(username, regEmail, regPassword, cPassword) {

		var creds = {
			username: username.value,
			email: regEmail.value,
			password: regPassword.value
		};

		if (creds.password != cPassword.value) {
			alert('password not matched.');
		}	

		this._loginservice.register(creds)
			.subscribe(
				data => this.loginResponse = JSON.stringify(data),
				error => this.logError(error),
				() => console.log('FINISH')
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