import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'

import {HomeComponent} from './home/home.component'
import {SignInComponent} from './signin/signin.component'
import {PostsComponent} from './posts/posts.component'
import {CreatePostComponent} from './createPost/createPost.component'

@Component({
    selector: 'clasified',
    templateUrl: 'app/components/app.html',
    directives: [HomeComponent, SignInComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/home', name: 'Home', component: HomeComponent},
	{ path: '/posts', name: 'Posts', component: PostsComponent},
	{ path: '/', name: 'CreatePost', component: CreatePostComponent, useAsDefault: true },
		
])
export class ClassifiedApp {

	public signInUpActive = null;
	public accountDropDownActive = false;

	constructor(){

	}

	signInModal() {
		this.signInUpActive = true;
		return;
	}

	signUpModal() {
		this.signInUpActive = false;
		return;
	}

	closeSignInUpModal(value) {
		this.signInUpActive = null;
	}

	openAcountDropDown($event) {
		this.accountDropDownActive = !this.accountDropDownActive;	
	}



}