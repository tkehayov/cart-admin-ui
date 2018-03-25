import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../constants';

import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: [
    './orders.component.scss',
    './../../../assets/icon/icofont/css/icofont.scss',
    '../../../../node_modules/sweetalert2/src/sweetalert2.scss']

})

export class OrdersComponent implements OnInit {
  orders = {
    data: []
  };
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get(BASICENDPOINT + '/orders').subscribe(data => {
      var jsonData = JSON.parse(JSON.stringify(data));
      this.orders.data = jsonData;
    });
  }

  goDetail(id) {
    this.router.navigate(['order/'+id]);
  }

  updateStatus(order, status) {
    this.http.put(BASICENDPOINT + '/orders', { "id": order.id, "status": status }).subscribe(data => {
      order.status = status;
    });
  }
}
