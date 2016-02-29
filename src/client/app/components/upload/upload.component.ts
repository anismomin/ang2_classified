
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from 'angular2/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from '../../../../../node_modules/ng2-file-upload';


// const URL = '/api/';
const URL = 'http://localhost:3000/post/create';

@Component({
  selector: 'uploader',
  template: 'app/component/upload/upload.html',
  directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class Uploader {
  private uploader: FileUploader = new FileUploader({ url: URL });
  private hasBaseDropZoneOver: boolean = false;
  private hasAnotherDropZoneOver: boolean = false;

  private fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  private fileOverAnother(e: any) {
    this.hasAnotherDropZoneOver = e;
  }
}