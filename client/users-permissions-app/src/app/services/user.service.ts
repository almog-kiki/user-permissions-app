import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import * as utils from '../lib/utils';

const baseUrl = '/api/users';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, public router: Router) { }
   
  private handleError = (error: HttpErrorResponse) =>{
    if(error.status === 404){
      utils.navigateToLogin(this.router);
    } else{
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
    }
    return throwError('Something bad happened; please try again later.');
  };

  getAll() {
    return this.http.get(baseUrl).pipe(catchError(this.handleError));
  }
  
  getRoles() {
    return this.http.get(baseUrl +"/roles").pipe(catchError(this.handleError));
  }
  
  // get(id) {
  //   return this.http.get(`${baseUrl}/${id}`).pipe(catchError(this.handleError));
  // }

  create(data) {
    return this.http.post(baseUrl, data).pipe(catchError(this.handleError));;
  }

  // update(id, data) {
  //   return this.http.put(`${baseUrl}/${id}`, data).pipe(catchError(this.handleError));;
  // }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`).pipe(catchError(this.handleError));;
  }

  deleteAll() {
    return this.http.post(baseUrl + "/deleteAll",{}).pipe(catchError(this.handleError));;
  }


}
