import {Component, EventEmitter} from 'angular2/core'
import {Http, Headers, HTTP_PROVIDERS}  from 'angular2/http'

import {ControlGroup, FormBuilder, Validators, FORM_DIRECTIVES, AbstractControl} from 'angular2/common'

import {PostService} from '../../services/PostService'
import {ControlMessages} from '../controlMessage/control-messages.component'
import {ValidationService} from '../../services/validationService'

@Component({
    templateUrl: 'app/components/posts/posts.html',
    providers: [PostService]
})
export class PostsComponent {

	
}