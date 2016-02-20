import {Component, EventEmitter} from 'angular2/core'
import {Http, Headers, HTTP_PROVIDERS}  from 'angular2/http'

import {ControlGroup, FormBuilder, Validators, FORM_DIRECTIVES} from 'angular2/common'


import {ControlMessages} from '../controlMessage/control-messages.component'
import {ValidationService} from '../../services/validationService'

@Component({
    templateUrl: 'app/components/createPost/createPost.html',
    directives: [ControlMessages]
})
export class CreatePostComponent {


}