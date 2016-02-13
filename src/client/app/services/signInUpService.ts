import {Injectable} from 'angular2/core'
import { Http, Headers, Response } from 'angular2/http';
import 'rxjs/add/operator/map'

@Injectable()
export class SignInUpService {

	public postResponse;

	constructor(public http: Http) { }


	login(creds) {
	
		let creds = "username=" + creds.username + "&password=" + creds.password;
		
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post('http://localhost:3000/user/login', creds, {
			headers: headers
		})
		.map(res => res.json());
	}

	register(creds) {

		let creds = "username=" + creds.username + "&email=" + creds.email + "&password=" + creds.password;

		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post('http://localhost:3000/user/register', creds , {
			headers: headers
		})
		.map(res => res.json());

	}


	getpost() {
		return this.http.get('http://jsonplaceholder.typicode.com/posts/1')
			.map(res => res.json());
	}



}