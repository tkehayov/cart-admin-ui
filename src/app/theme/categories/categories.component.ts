import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../constants';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: [
    './categories.component.scss',
    './../../../assets/icon/icofont/css/icofont.scss',
    '../../../../node_modules/sweetalert2/src/sweetalert2.scss'],
})

export class CategoriesComponent implements OnInit {
  productForm: FormGroup;
  options: any = {
    position: ['bottom', 'right'],
    timeOut: 1000,
    theClass: 'small-icon'
  };

  state: ITreeState;
  category = [];

  constructor(private router: Router, private http: HttpClient) {
    this.productForm = new FormGroup({});
  }

  ngOnInit() {
    this.listCategories();
  }

  selectCategory() {
    this.productForm.value.categoryId = this.state.focusedNodeId;
  }

  listCategories() {
    this.http.get(BASICENDPOINT + '/categories').subscribe(data => {
      this.category = JSON.parse(JSON.stringify(data));
    });
  }
}
