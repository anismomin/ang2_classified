import {Component, NgZone} from 'angular2/core';
import {UPLOAD_DIRECTIVES} from 'ng2-uploader';

@Component({
  selector: 'multiple-progressbar',
  templateUrl: 'app/components/uploader/uploader.html',
  directives: [UPLOAD_DIRECTIVES]
})
export class MultipleProgressbar {
  uploadFiles: any[];
  uploadProgresses: any[] = [];
  zone: NgZone;
  options: Object = {
    url: 'http://localhost:3000/post/create'
  };

  constructor() {
    this.zone = new NgZone({ enableLongStackTrace: false });
  }

  handleUpload(data): void {
    let id = data.id;
    let index = this.findIndex(id);
    if (index === -1) {
      this.uploadProgresses.push({ id: id, percent: 0 });
    }
    if (this.uploadProgresses[index]) {
      this.zone.run(() => {
        this.uploadProgresses[index].percent = data.progress.percent;
      });
    }
  }

  findIndex(id: string): number {
    return this.uploadProgresses.findIndex(x => x.id === id);
  }

}