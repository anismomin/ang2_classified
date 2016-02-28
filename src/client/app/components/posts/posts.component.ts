import {Component, EventEmitter} from 'angular2/core'
import {Http, Headers, HTTP_PROVIDERS}  from 'angular2/http'
import {PostService} from '../../services/PostService'

@Component({
    templateUrl: 'app/components/posts/posts.html',
    providers: [PostService]
})
export class PostsComponent {

	posts: Array<any>;

	constructor(public postService: PostService) {
		
		this.postService.getposts()
		.subscribe(
			data => this.posts = data,
			error => console.log(error),
			() => {
				console.log(this.posts);
			}
		);
	}
	
}