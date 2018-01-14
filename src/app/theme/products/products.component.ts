import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomValidators } from 'ng2-validation';
import { BASICENDPOINT } from '../../constants';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [
    './products.component.scss',
    './../../../assets/icon/icofont/css/icofont.scss',
    '../../../../node_modules/sweetalert2/src/sweetalert2.scss'
})

export class ProductsComponent implements OnInit {
  products = [];
  showDialog = false;
  public config: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(BASICENDPOINT + '/products').subscribe(data => {
      this.products = data;
    });
  }

  delete(id: integer) {
    swal({
      title: 'Are you sure?',
      text: 'Product wont be able to revert',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, cancel',
      confirmButtonClass: 'btn btn-success m-r-10',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.http.delete(BASICENDPOINT + '/products/' + id).subscribe(data => {
          swal(
            'Deleted!',
            'Product has been deleted.',
            'success'
          )

          this.http.get(BASICENDPOINT + '/products').subscribe(data => {
            this.products = data;
          });
        });
      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Product is not deleted',
          'error'
        )
      }
    }).catch(swal.noop);

  }
  openSuccessCancelSwal() {

  }

}
