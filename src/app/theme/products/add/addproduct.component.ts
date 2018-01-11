import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../../constants';
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

  constructor(private http: HttpClient) {
    const name = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);

    this.productForm = new FormGroup({
      name: name,
      description: description
    });
    /*Basic validation end*/

  }

  ngOnInit() {
    console.log(BASICENDPOINT);
  }

  onSubmit() {
    this.submitted = true;

    if (this.productForm.status === "VALID") {
      // this.http.get(BASICENDPOINT+'/api/items').subscribe(data => {
        this.http.post(BASICENDPOINT+'/',this.productForm.value).subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);
        // this.results = data['results'];
      });
      console.log(this.productForm.value);
    }
  }

}
