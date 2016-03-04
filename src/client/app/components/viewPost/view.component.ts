import {Component} from 'angular2/core'
import {RouteParams} from 'angular2/router'
import {PostService} from '../../services/postService'
import {Post} from '../../models/Post';


@Component({
    templateUrl: 'app/components/viewPost/view.html',
    providers: [PostService]
})
export class ViewPostComponent {

	id: string;
	post : Post = new Post();

	constructor(public postService: PostService, private routeParams: RouteParams) {
		this.getpostById();
	}

	getpostById() {

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
