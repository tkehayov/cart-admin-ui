import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
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
    '../../../../node_modules/sweetalert2/src/sweetalert2.scss']
})

export class ProductsComponent implements OnInit {
  products = {
    data: [],
    totalPages: 0
  };

  showDialog = false;
  public config: any;
  page = 0;
  Arr = Array;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get(BASICENDPOINT + '/products/?size=10&page=' + this.page).subscribe(data => {
      var jsonData = JSON.parse(JSON.stringify(data));
      this.products.data = jsonData.productList;
      this.products.totalPages = jsonData.totalPages;
    });
  }

  delete(id) {
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

          this.ngOnInit();
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

  nextPage(page: any): void {
    this.page++;
    this.ngOnInit();
  }

  prevPage(page: any): void {
    this.page--;
    this.ngOnInit();
  }

  gotoPage(page) {
    this.page = page;
    this.ngOnInit();
  }

  goProductDetail(productId) {
    this.router.navigate(['products/view/' + productId]);
  }

  goProductEdit(productId) {
    this.router.navigate(['products/edit/' + productId]);
  }
}
