import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as utils from '../lib/utils';
import { Observable } from "rxjs"

const baseUrl = '/api/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(baseUrl, data).pipe(catchError(utils.handleError));
  }
  
  loginAsAGuest(){
    return this.http.get(baseUrl+'/guest').pipe(catchError(utils.handleError));
  }
}
