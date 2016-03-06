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
	filesToUpload: Array<File> = [];
	 

	constructor(private fb: FormBuilder, private _http: Http, private _postService: PostService) {
		
		this.postForm = this.fb.group({
			'title': ['dumytitile', Validators.compose([Validators.required])],
			'price': ['20', Validators.compose([Validators.required])],
			'category': ['mobile', Validators.compose([Validators.required])],
			'description': ['Checkout this description', Validators.compose([Validators.required])],
			'name': ['mynmae', Validators.compose([Validators.required])],
			'phone': ['03343853136', Validators.compose([Validators.required])],
			'postImg': [''],
			'state': ['sindh', Validators.compose([Validators.required])],
			'city': ['karachi', Validators.compose([Validators.required])]
		});
	}

	createPost(postForm) {
	
		var imagess = this.filesToUpload;
		let PostData = {
			title: postForm.title,
			price: postForm.price,
			category: postForm.category,
			description: postForm.description,
			name: postForm.name,
			phone: postForm.phone,
			postImg: imagess,
			state: postForm.state,
			city: postForm.city
		};
		console.log(imagess);
		console.log(PostData);
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

    upload() {
		// console.log(this.filesToUpload);

  //       this.makeFileRequest("http://localhost:3000/post/upload", [], this.filesToUpload).then((result) => {
  //           console.log(result);
  //       }, (error) => {
  //           console.debug(error);
  //       });
    }

    fileChangeEvent($event) {
		var inputValue = $event.target;
		
		if (null == inputValue || null == inputValue.files[0]) { 
			console.debug("Input file error.");
			return; 
		}	

		Object.keys(inputValue.files).forEach((key) => {
			this.filesToUpload.push(inputValue.files[key]);
			console.debug("Input File name: " + inputValue.files[key].name + " type:" + inputValue.files[key].size + " size:" + inputValue.files[key].size);
		});
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }
}
