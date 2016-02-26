import {Injectable} from 'angular2/core'
import { Http, Headers, Response } from 'angular2/http';
import 'rxjs/add/operator/map'

@Injectable()
export class PostService {

	public postResponse;

	constructor(private http: Http) { }

	createPost(postData) {
	
		let Creds = JSON.stringify(postData);
		
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post('http://localhost:3000/post/create', Creds, {
			headers: headers
		})
		.map(res => res.json());
	}



	getpost() {
		return this.http.get('http://jsonplaceholder.typicode.com/posts/1')
			.map(res => res.json());
	}



}