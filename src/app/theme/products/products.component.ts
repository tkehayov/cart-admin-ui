import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomValidators } from 'ng2-validation';
import { BASICENDPOINT } from '../../constants';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../../shared/search.service';

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
  searchTerm$ = new Subject<string>();

  showDialog = false;
  public config: any;
  public pageSize = 10;
  public maxSize = 5;
  public page = 1;
  Arr = Array;

  constructor(private http: HttpClient, private router: Router, private searchService: SearchService) {
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        var jsonData = JSON.parse(JSON.stringify(results.productList));

        this.products.totalPages = results.totalPages * 10;
        this.products.data = jsonData;
      });
  }

  ngOnInit() {
    this.http.get(BASICENDPOINT + '/products/?size=' + this.pageSize + '&page=' + (this.page - 1)).subscribe(data => {
      var jsonData = JSON.parse(JSON.stringify(data.productList));
      this.products.totalPages = data.totalPages * 10;
      this.products.data = jsonData;
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
          'Product not deleted',
          'error'
        )
      }
    }).catch(swal.noop);

  }

  loadPage($event) {
    this.http.get(BASICENDPOINT + '/products/?size=' + this.pageSize + '&page=' + (this.page - 1)).subscribe(data => {
      var jsonData = JSON.parse(JSON.stringify(data.productList));
      this.products.totalPages = data.totalPages * 10;
      this.products.data = jsonData;
    });
  }

  goProductDetail(productId) {
    this.router.navigate(['products/view/' + productId]);
  }

  goProductEdit(productId) {
    this.router.navigate(['products/edit/' + productId]);
  }
}
