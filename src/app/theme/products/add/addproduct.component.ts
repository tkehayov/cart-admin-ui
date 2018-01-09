import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor() {

    const name = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);

    this.productForm = new FormGroup({
      name: name,
      description: description
    });
    /*Basic validation end*/

  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    if(this.productForm.status==="VALID"){
        console.log(this.productForm.value);
    }
  }

}
