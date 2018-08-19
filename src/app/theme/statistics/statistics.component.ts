import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})

export class StatisticsComponent implements OnInit {
  
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    
  }
}
