import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomValidators } from 'ng2-validation';
import { BASICENDPOINT } from '../../constants';
import { transition, trigger, style, animate } from '@angular/animations';
import { NotificationsService } from 'angular2-notifications';
import swal from 'sweetalert2';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',

  styleUrls: [
    './products.component.scss',
    './../../../assets/icon/icofont/css/icofont.scss',
    '../../../../node_modules/sweetalert2/src/sweetalert2.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class ProductsComponent implements OnInit {
  products = {
    data: [],
    totalPages: 0
  };
  searchTerm$ = new Subject<string>();

  // pnotify options
  options: any = {
    position: ['bottom', 'right'],
    timeOut: 1000,
    theClass: 'small-icon'
  };

  showDialog = false;
  public config: any;
  public pageSize = 10;
  public maxSize = 5;
  public page = 1;
  Arr = Array;

  constructor(private http: HttpClient, private router: Router, private searchService: SearchService, private servicePNotify: NotificationsService) {
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        var jsonData = JSON.parse(JSON.stringify(results.productList));

        this.products.totalPages = results.totalPages * 10;
        this.products.data = jsonData;
      });
  }

  ngOnInit() {
    this.http.get(BASICENDPOINT + '/products/?size=' + this.pageSize + '&page=' + (this.page - 1)).subscribe(data => {
      var jsonData = JSON.parse(JSON.stringify(data));
      this.products.totalPages = jsonData.totalPages * 10;
      this.products.data = jsonData.productList;
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
            'Product deleted.',
            'success'
          )

          this.ngOnInit();
        });
      } else {
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
      var jsonData = JSON.parse(JSON.stringify(data));
      this.products.totalPages = jsonData.totalPages * 10;
      this.products.data = jsonData.productList;
    });
  }

  goProductDetail(productId) {
    this.router.navigate(['products/view/' + productId]);
  }

  goProductEdit(productId) {
    this.router.navigate(['products/edit/' + productId]);
  }

  updateStatus(productId, status) {
    this.http.put(BASICENDPOINT + "/products/status/" + productId + "/" + status, "", { responseType: 'text' }).subscribe(data => {
      for (var index in this.products.data) {
        if (this.products.data[index].id == productId) {
          this.products.data[index].status = data;
        }
      }

      this.servicePNotify.success(
        "",
        "Product status updated."
      );
    });
  }
}
