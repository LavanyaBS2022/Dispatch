import { HttpClient,HttpHeaders ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  private rootUrl = environment.base_url
  constructor(private http: HttpClient) { }

  
  postRequest(url: string, body: {}): Observable<any> {
    const headers = new HttpHeaders().set('Authorization','');
    return this.http.post(`${this.rootUrl}${url}`, body, { headers });
  }

  getRequest(url: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization','')
    let value = this.http.get(`${this.rootUrl}${url}`, { headers });
    return value;
  }

  getRequestbyParam(url: string, type: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', '')
    let params = new HttpParams().set("type", type);
    let value = this.http.get(`${this.rootUrl}${url}`, { headers, params });
    return value;
  }


}
