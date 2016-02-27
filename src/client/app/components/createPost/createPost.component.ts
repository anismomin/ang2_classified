import {Component, EventEmitter} from 'angular2/core'
import {Http, Headers, HTTP_PROVIDERS}  from 'angular2/http'
import {ControlGroup, FormBuilder, Validators, FORM_DIRECTIVES} from 'angular2/common'

import {ControlMessages} from '../controlMessage/control-messages.component'
import {ValidationService} from '../../services/validationService'
import {PostService} from '../../services/postService'

@Component({
    templateUrl: 'app/components/createPost/createPost.html',
    directives: [FORM_DIRECTIVES, ControlMessages],
    providers: [PostService, ValidationService]
})
export class CreatePostComponent {
	
	postForm: ControlGroup;
	postingResponse: string;
	postFormProcess = false;

	constructor(private fb: FormBuilder, private _http: Http, private _postService: PostService) {

		this.postForm = this.fb.group({
			'title': ['dumytitile', Validators.compose([Validators.required])],
			'category': ['mobile', Validators.compose([Validators.required])],
			'description': ['Checkout this description', Validators.compose([Validators.required])],
			'name': ['mynmae', Validators.compose([Validators.required])],
			'phone': ['03343853136', Validators.compose([Validators.required])],
			'images': [''],
			'state': ['sindh', Validators.compose([Validators.required])],
			'city': ['karachi', Validators.compose([Validators.required])]
		});
	}

	createPost(postForm) {
		
		// let PostData = {
		// 	title: postForm.title,
		// 	category: postForm.category,
		// 	description: postForm.description,
		// 	name: postForm.name,
		// 	phone: postForm.phone,
		// 	images: postForm.images,
		// 	state: postForm.state,
		// 	city: postForm.city
		// };
		
		let postData = JSON.stringify(postForm);
		this.postFormProcess = true;

		this._postService.createPost(postForm)
			.subscribe(
				data => this.postingResponse = JSON.stringify(data),
				error => this.logError(error),
				() => {
					this.postFormProcess = false;
					console.log(this.postingResponse);
				}
			);
	}

	logError(error) {
		console.log(error);
	}
	
}
