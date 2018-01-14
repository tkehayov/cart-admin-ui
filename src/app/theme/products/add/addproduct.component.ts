import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../../constants';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-product',
  templateUrl: './addproduct.component.html',
  styleUrls: [
    './addproduct.component.scss',
    './../../../../assets/icon/icofont/css/icofont.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  submitted: boolean;
  results: string[];

  // pnotify options
  options: any = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    theClass: 'small-icon'
  };

  constructor(private http: HttpClient, private servicePNotify: NotificationsService) {
    const name = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    const salePrice = new FormControl('', [Validators.required,CustomValidators.number]);

    this.productForm = new FormGroup({
      name: name,
      description: description,
      salePrice: salePrice
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.servicePNotify.remove();
    this.submitted = true;

    if (this.productForm.status === "VALID") {
      this.http.post(BASICENDPOINT + '/products', this.productForm.value).subscribe(data => {
        this.servicePNotify.success(
          "",
          "Success!"
        );
      });
    }
  }

}
