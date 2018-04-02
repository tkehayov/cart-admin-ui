import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASICENDPOINT } from '../../../constants';
import { transition, trigger, style, animate } from '@angular/animations';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './viewproduct.component.html',
  styleUrls: [
    './viewproduct.component.scss',
    './../../../../assets/icon/icofont/css/icofont.scss'
  ]
})

export class ViewProductComponent implements OnInit {
  queryParams: { id: "" };
  basicEndPoint = BASICENDPOINT;
  products = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.queryParams = params.id);

    this.http.get(BASICENDPOINT + '/products/' + this.queryParams).subscribe(data => {
      var jsonData = JSON.parse(JSON.stringify(data));
      this.products = jsonData;
    });
  }
}
