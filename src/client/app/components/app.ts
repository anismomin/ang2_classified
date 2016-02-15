import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'

import {HomeComponent} from './home/home.component'
import {SignInComponent} from './signin/signin.component'
import {PostsComponent} from './posts/posts.component'
import {CreatePostComponent} from './createPost/createPost.component'
import {SignInUpService} from '../services/SignInUpService'

@Component({
    selector: 'clasified',
    templateUrl: 'app/components/app.html',
    directives: [HomeComponent, SignInComponent, ROUTER_DIRECTIVES],
    providers: [SignInUpService]
})
@RouteConfig([
	{ path: '/home', name: 'Home', component: HomeComponent},
	{ path: '/posts', name: 'Posts', component: PostsComponent},
	{ path: '/', name: 'CreatePost', component: CreatePostComponent, useAsDefault: true },	
])
export class ClassifiedApp {

	public signInUpActive = null;
	public logInStatus = false;

	public accountDropDownActive = false;

	constructor(private _loginservice: SignInUpService) {

	}

	signInModal() {
		console.log(this.logInStatus);
		console.log(this.signInUpActive);
		if (!this.logInStatus) {
			this.signInUpActive = true;
		}
		return;
	}

	signUpModal() {
		if (!this.logInStatus) {
			this.signInUpActive = false;
		}
		return;
	}

	closeSignInUpModal(value) {
		this.logInStatus = value;
		this.signInUpActive = null;
		this.upateLoginStatus(value);
	}

	openAcountDropDown($event) {
		this.accountDropDownActive = !this.accountDropDownActive;	
	}

	logOut(){

		this._loginservice.logOut()
			.subscribe(
			data => JSON.stringify(data),
			error => console.log(error),
			() => {
				this.signInUpActive = null;
				this.logInStatus = false;
				console.log('logout');
			}
		);
	
		return;
	}


	upateLoginStatus(value) {
		this.logInStatus = value;
	}

}