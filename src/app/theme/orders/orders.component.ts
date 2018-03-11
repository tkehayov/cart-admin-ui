import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../constants';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    './orders.component.scss',
    './../../../assets/icon/icofont/css/icofont.scss',
    '../../../../node_modules/sweetalert2/src/sweetalert2.scss']
})

export class OrdersComponent implements OnInit {

}
