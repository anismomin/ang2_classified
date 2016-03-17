import {Component, EventEmitter} from 'angular2/core'
import {Http, Headers, HTTP_PROVIDERS}  from 'angular2/http'
import {RouterLink}  from 'angular2/router'
import {PostService} from '../../services/PostService'

import {Post} from '../../models/Post';

@Component({
    templateUrl: 'app/components/posts/posts.html',
    directives: [RouterLink],
    providers: [PostService],
    styles: [`
		.postActions {clear:both; backgroud-color:#fff; padding:10px;}
    `]
})
export class PostsComponent {

	posts: Post[];

	constructor(public postService: PostService) {
		this.getPosts();
		
	}

	private getPosts(){
		this.postService.getPosts()
			.subscribe(
			data => this.posts = data,
			error => console.log(error),
			() => {
				console.log(this.posts);
			}
			);
	}


	private deletePost(id){
		
		this.postService.deletePost(id)
			.subscribe(
				data => {
					console.log('Post Delete');
				},
				error => console.log(error),
				() => {
					console.log('Delete Complete');
				}
			);
	}

	private showPost(id) {

		this.postService.getpostById(id)
			.subscribe(
			data => {
				console.log('Post Delete');
			},
			error => console.log(error),
			() => {
				console.log('Delete Complete');
			}
			);
	}
	
}