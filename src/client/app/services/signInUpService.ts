import {Injectable} from 'angular2/core'
import { Http, Headers, Response } from 'angular2/http';
import 'rxjs/add/operator/map'

@Injectable()
export class SignInUpService {

	public postResponse;

	constructor(public http: Http) { }


	login(creds) {
		var params = JSON.stringify(creds);
		var headers = new Headers();
		headers.append('content-type', 'application/json');

		return this.http.post('http://localhost:3100', params, {
			headers: headers
		})
		.map(res => res.json());
	}

	register(creds) {
		var params = JSON.stringify(creds);
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post('http://localhost:3100/register', params, {
			headers: headers
		})
		.map(res => res.json());

	}


	getpost() {
		return this.http.get('http://jsonplaceholder.typicode.com/posts/1')
			.map(res => res.json());
	}



}