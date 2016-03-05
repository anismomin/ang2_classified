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
	filesToUpload: Array<File>;


	constructor(private fb: FormBuilder, private _http: Http, private _postService: PostService) {
		this.filesToUpload = [];
		this.postForm = this.fb.group({
			'title': ['dumytitile', Validators.compose([Validators.required])],
			'price': ['20', Validators.compose([Validators.required])],
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
				error => console.log(error),
				() => {
					this.postFormProcess = false;
					console.log(this.postingResponse);
				}
			);
	}

    // upload() {
    //     this.makeFileRequest("http://localhost:3000/upload", [], this.filesToUpload).then((result) => {
    //         console.log(result);
    //     }, (error) => {
    //         console.error(error);
    //     });
    // }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }

    // makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    //     return new Promise((resolve, reject) => {
    //         var formData: any = new FormData();
    //         var xhr = new XMLHttpRequest();
    //         for (var i = 0; i < files.length; i++) {
    //             formData.append("uploads[]", files[i], files[i].name);
    //         }
    //         xhr.onreadystatechange = function() {
    //             if (xhr.readyState == 4) {
    //                 if (xhr.status == 200) {
    //                     resolve(JSON.parse(xhr.response));
    //                 } else {
    //                     reject(xhr.response);
    //                 }
    //             }
    //         }
    //         xhr.open("POST", url, true);
    //         xhr.send(formData);
    //     });
    // }
}
