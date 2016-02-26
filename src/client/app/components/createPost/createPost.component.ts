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
	
	postingForm: ControlGroup;
	postingResponse: string;


	constructor(private fb: FormBuilder, private _http: Http, private _postService: PostService) {

		this.postingForm = this.fb.group({
			'title': ['dumytitile', Validators.compose([Validators.required])],
			'category': ['mobile', Validators.compose([Validators.required])],
			'description': ['Checkout this description', Validators.compose([Validators.required])],
			'name': ['mynmae', Validators.compose([Validators.required])],
			'phone': ['03343853136', Validators.compose([Validators.required])],
			'images': ['', Validators.compose([Validators.required])],
			'state': ['sindh', Validators.compose([Validators.required])],
			'city': ['karachi', Validators.compose([Validators.required])]
		});
	}

	createPost(postingForm) {
		
		let PostData = {
			title: postingForm.title,
			category: postingForm.category,
			description: postingForm.description,
			name: postingForm.name,
			phone: postingForm.phone,
			images: postingForm.images,
			state: postingForm.state,
			city: postingForm.city
		};

		this._postService.createPost(postingForm)
			.subscribe(
				data => this.postingResponse = JSON.stringify(data),
				error => this.logError(error),
				() => {
					console.log(this.postingResponse);
				}
			);
	}

	logError(error) {
		console.log(error);
	}
	
}
