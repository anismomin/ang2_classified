import {Component, EventEmitter} from 'angular2/core'
import {Http, Headers, HTTP_PROVIDERS}  from 'angular2/http'
import {RouterLink}  from 'angular2/router'
import {PostService} from '../../services/PostService'


@Component({
    templateUrl: 'app/components/posts/posts.html',
    directives: [RouterLink],
    providers: [PostService]
})
export class PostsComponent {

	posts: Array<any>;

	constructor(public postService: PostService) {
		
		this.postService.getPosts()
		.subscribe(
			data => this.posts = data,
			error => console.log(error),
			() => {
				console.log(this.posts);
			}
		);
	}
	
}