import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomValidators } from 'ng2-validation';
import { BASICENDPOINT } from '../../constants';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [
    './products.component.scss',
    './../../../assets/icon/icofont/css/icofont.scss']
})
export class ProductsComponent implements OnInit {
  products = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(BASICENDPOINT + '/products').subscribe(data => {
      this.products = data;
    });
  }

}
