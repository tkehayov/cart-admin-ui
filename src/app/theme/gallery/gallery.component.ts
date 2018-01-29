import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../constants';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    './gallery.component.scss',
    './../../../assets/icon/icofont/css/icofont.scss',
    '../../../../node_modules/sweetalert2/src/sweetalert2.scss']
})

export class GalleryComponent implements OnInit {
  basicEndPoint = BASICENDPOINT;
  images = [];
  imageSizes = [{
    key: "front image - width 300",
    value: 300
  },
  {
    key: "inner image - width 200",
    value: 200
  },
  {
    key: "background image - width 1000",
    value: 1000
  }];
  selectedSize = this.imageSizes[0].value;

  // Pnotify options
  options: any = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    theClass: 'small-icon'
  };

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private http: HttpClient, private servicePNotify: NotificationsService) { }

  ngOnInit() {
    this.listImages();

  }

  listImages() {
    this.http.get(BASICENDPOINT + '/gallery/imagelist').subscribe(data => {
      this.images = JSON.parse(JSON.stringify(data));
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  send() {
    this.servicePNotify.remove();
    var formData = new FormData();
    var croppedImage = this.dataURItoBlob(this.croppedImage);

    formData.set("file", croppedImage, "bat.jpg");

    this.http.post(BASICENDPOINT + '/gallery/image', formData).subscribe(data => {
      this.listImages();
      this.servicePNotify.success(
        "Success!",
        "Image uploaded"
      );
    });

  }

  optionsSelected(event) {
    this.selectedSize = event;
  }

  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }
}
