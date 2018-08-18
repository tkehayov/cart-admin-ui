import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../constants';
import { NotificationsService } from 'angular2-notifications';
import { ITreeState } from 'angular-tree-component';
import swal from 'sweetalert2';

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
  newCat = {};

  constructor(private router: Router, private http: HttpClient, private servicePNotify: NotificationsService) {
  }

  ngOnInit() {
    this.listCategories();
  }

  listCategories() {
    this.http.get(BASICENDPOINT + '/categories').subscribe(data => {
      this.tree = JSON.parse(JSON.stringify(data));
      this.maxDepth(JSON.parse(JSON.stringify(data)));
    });
  }

  maxDepth(root) {
    for (var index in root) {
      var cat = { name: root[index].name, id: root[index].id, path: root[index].path };

      this.category.push(cat);
      this.maxDepth(root[index].children);
    }
  }

  addCategory() {
    this.http.post(BASICENDPOINT + '/categories', this.newCat).subscribe(data => {
      console.log(data);
      var adddedCat = JSON.parse(JSON.stringify(data));
      // this.listCategories();
      this.servicePNotify.success(
        "Success",
        "Category added"
      );
    }, Error => {
      this.servicePNotify.error(
        "Error",
        "Category with this path already exists"
      );
    });
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

  deleteCategory(catId){
    console.log(catId);
    swal({
      title: 'Are you sure?',
      text: 'Category wont be able to revert',
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
        this.http.delete(BASICENDPOINT + '/categories/?id=' + catId).subscribe(data => {
          swal(
            'Deleted!',
            'Category deleted.',
            'success'
          )
        });
      } else {
        swal(
          'Cancelled',
          'Category not deleted',
          'error'
        )
      }
    }).catch(swal.noop);
  }
}
