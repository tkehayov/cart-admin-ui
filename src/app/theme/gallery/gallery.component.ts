import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../constants';
import swal from 'sweetalert2';
const URL = 'http://localhost:8080/gallery/image';

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
  images=[];
  imageSizes = [{
    key: "front image",
    value: 300
  },
  {
    key: "inner image",
    value: 200
  },
  {
    key: "background image",
    value: 1000
  }];
  selectedSize = this.imageSizes[0].value;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
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
    var formData = new FormData();
    var croppedImage = this.dataURItoBlob(this.croppedImage);

    formData.set("file", croppedImage, "bat.jpg");

    this.http.post('http://localhost:8080/gallery/image', formData).subscribe(data => {
      console.log("data")
    });

  }

  optionsSelected(event) {
    this.selectedSize =event;
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
