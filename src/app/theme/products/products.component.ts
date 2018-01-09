import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [
    './products.component.scss',
    './../../../assets/icon/icofont/css/icofont.scss']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  addProductPage(){

  }

  ngOnInit() {
  }

}
