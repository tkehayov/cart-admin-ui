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
    '../../../../node_modules/sweetalert2/src/sweetalert2.scss']

})

export class CategoriesComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    // this.http.get(BASICENDPOINT + '/Categories/?size=' + this.pageSize + '&page=' + (this.page - 1)).subscribe(data => {
    //   var jsonData = JSON.parse(JSON.stringify(data));
    //   console.log("maliii",jsonData.pageSize);
    //   this.Categories.totalPages = jsonData.pageSize * 10;
    //   this.Categories.data = jsonData.Categories;
    // });
  }
}
