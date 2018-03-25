import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../constants';

import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: [
    './order.component.scss',
    './../../../assets/icon/icofont/css/icofont.scss',
    '../../../../node_modules/sweetalert2/src/sweetalert2.scss']
})

export class OrderComponent implements OnInit {
  params = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.params = params);

    this.http.get(BASICENDPOINT + '/orders').subscribe(data => {
      var jsonData = JSON.parse(JSON.stringify(data));
      // this.orders.data = jsonData;
    });
  }

  updateStatus(order, status) {
    this.http.put(BASICENDPOINT + '/orders', { "id": order.id, "status": status }).subscribe(data => {
      // order.status = status;
    });
  }
}
