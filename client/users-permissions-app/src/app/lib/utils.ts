import { HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';


export const isStringsEqual = (str1: string, str2: string)=>{
    return str1 === str2;
}

export const navigateToUrl = (router, url) => {
  router.navigate([url]);
}
export const navigateToLogin = (router) => {
  navigateToUrl(router,"/") 
}
export const handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    let errorMsg = "Something bad happened; please try again later.";
    return throwError(errorMsg);
};

