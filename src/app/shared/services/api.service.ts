import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private rootUrl = environment.base_url
  private rootURL_shimul = environment.base_url_shimul 

  constructor(private http: HttpClient,private sharedService: SharedService,private spinner: NgxSpinnerService) {
  }

  postLoginRequest(url: string, body: {}): Observable<any> {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    return this.http.post(`${this.rootUrl}${url}`, body);
  }

  getRequest(url: string): Observable<any> {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    const headers = new HttpHeaders().set('Authorization', this.sharedService.Token)
    let value = this.http.get(`${this.rootURL_shimul}${url}`, { headers });
    return value;
  }

  getRouteDispatchItems(url:string,routeCode:number,gpDate:string): Observable<any> {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);    
    const headers = new HttpHeaders().set('Authorization', this.sharedService.Token)
    let params =new HttpParams().set("routeCode",routeCode).set("gpDate",gpDate);
    let value = this.http.get(`${this.rootURL_shimul}${url}`,{headers,params});
    return value;
   }

  //  getRequest(url: string): Observable<any> {
  //   this.spinner.show();
  //   setTimeout(() => {
  //     this.spinner.hide();
  //   }, 2000);
  //   const token = this.sharedService.getToken() || '';
  //   const headers = new HttpHeaders().set('Authorization', token);
  //   let value = this.http.get(`${this.rootURL_shimul}${url}`, { headers });
  //   return value;
  // }


  // getRouteDispatchItems(url:string,routeCode:number,gpDate:string): Observable<any> {
  //   this.spinner.show();
  //   setTimeout(() => {
  //     this.spinner.hide();
  //   }, 2000);    
  //   const token = this.sharedService.getToken() || '';
  //   const headers = new HttpHeaders().set('Authorization', token);
  //   let params =new HttpParams().set("routeCode",routeCode).set("gpDate",gpDate);
  //   let value = this.http.get(`${this.rootURL_shimul}${url}`,{headers,params});
  //   return value;
  //  }
}


