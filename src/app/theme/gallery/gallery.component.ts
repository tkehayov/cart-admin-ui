import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomValidators } from 'ng2-validation';
import { BASICENDPOINT } from '../../constants';
import {FileUploader} from 'ng2-file-upload';
import swal from 'sweetalert2';
const URL = 'http://localhost:8080/products/ff';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    './gallery.component.scss',
    './../../../assets/icon/icofont/css/icofont.scss',
    '../../../../node_modules/sweetalert2/src/sweetalert2.scss']
})

export class GalleryComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
hasAnotherDropZoneOver = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.http.get(BASICENDPOINT + '/products').subscribe(data => {
    //   this.products = JSON.parse(JSON.stringify(data));
    // });
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
