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
  options: any = {
    position: ['bottom', 'right'],
    timeOut: 1000,
    theClass: 'small-icon'
  };

  state: ITreeState;
  category = [];
  tree = [];

  constructor(private router: Router, private http: HttpClient,private servicePNotify: NotificationsService) {
  }

  ngOnInit() {
    this.listCategories();
  }

  listCategories() {
    this.http.get(BASICENDPOINT + '/categories').subscribe(data => {
      this.tree = JSON.parse(JSON.stringify(data));
      var a = this.maxDepth(JSON.parse(JSON.stringify(data)));
    });
  }

  maxDepth(root) {
    for (var index in root) {
      var cat = { name: root[index].name, id: root[index].id, path: root[index].path };

      this.category.push(cat);
      this.maxDepth(root[index].children);
    }
  }

  updateCategory(id, path) {
    var message = { id: id, path: path };
    this.http.put(BASICENDPOINT + '/categories', message).subscribe(data => {
      this.category = [];
      this.listCategories();
      this.servicePNotify.success(
        "Success",
        "Category updated"
      );
    }, Error => {
      console.log(Error);
    });

  }
}
