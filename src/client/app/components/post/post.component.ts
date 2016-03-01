import {Component, EventEmitter} from 'angular2/core'
import {Http, Headers}  from 'angular2/http'
import {RouteParams}  from 'angular2/router'
import {PostService} from '../../services/PostService'


@Component({
    templateUrl: 'app/components/post/post.html',
    providers: [PostService]
})
export class PostsComponent {

	posts: Array<any>;
	id: string;
	post: {};

	constructor(public postService: PostService, private routeParams: RouteParams) {
		this.getPost();
	}

	getPost(){

		this.id = this.routeParams.get("id");

		this.postService.getpostById(this.id)
			.subscribe(
			data => this.post = data,
			error => console.log(error),
			() => {
				console.log(this.post);
			}
			);
	}

}