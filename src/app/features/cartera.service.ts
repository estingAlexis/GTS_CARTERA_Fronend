import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { APP } from '@app/constants';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class CarteraService {

  AppBaseUrl = APP.AppBaseUrl;

  constructor(private http: HttpClient) { }

  public sendScv(file: any){
    this.http.post(this.AppBaseUrl+'/input', file, httpOptions)
  }
}
