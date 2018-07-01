import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { BASICENDPOINT } from '../constants';

@Injectable()
export class SearchService {
  baseUrl: string = BASICENDPOINT + '/products';
  queryUrl: string = '?name=';

  constructor(private http: Http) { }

  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    console.log(this.baseUrl + this.queryUrl + term);
    var query = this.baseUrl + this.queryUrl + term;
    if (term == "") {
      this.queryUrl = "?size=10&page=0";
      query = this.baseUrl + this.queryUrl;
    }else{
      this.queryUrl = '?name=';
      query = this.baseUrl + this.queryUrl + term;
    }

    return this.http
      .get(query)
      .map(res => res.json());
  }
}
