import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../../constants';
import { transition, trigger, style, animate } from '@angular/animations';
import { ActivatedRoute, RouterModule, Routes, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './viewproduct.component.html',
  styleUrls: [
    './viewproduct.component.scss',
    './../../../../assets/icon/icofont/css/icofont.scss'
  ]
})

export class ViewProductComponent implements OnInit {
  queryParams: { id: "" };
  basicEndPoint = BASICENDPOINT;
  products = {
    "gallery":[]
  };

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.queryParams = params.id);

    this.http.get(BASICENDPOINT + '/products/' + this.queryParams).subscribe(data => {
      var jsonData = JSON.parse(JSON.stringify(data));
      this.products = jsonData;
    });
  }

  goProductEdit() {
    this.router.navigate(['products/edit/' + this.queryParams]);
  }

  deleteProduct() {
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
        this.http.delete(BASICENDPOINT + '/products/' + this.queryParams).subscribe(data => {
          swal(
            'Deleted!',
            'Product has been deleted.',
            'success'
          )
          this.router.navigate(['products']);
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
}
