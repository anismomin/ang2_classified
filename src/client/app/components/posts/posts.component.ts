import {Component, EventEmitter} from 'angular2/core'
import {Http, Headers, HTTP_PROVIDERS}  from 'angular2/http'
import {RouterLink}  from 'angular2/router'
import {PostService} from '../../services/PostService'

import {Post} from '../../models/Post';

@Component({
    templateUrl: 'app/components/posts/posts.html',
    directives: [RouterLink],
    providers: [PostService]
})
export class PostsComponent {

	posts: Post[];

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