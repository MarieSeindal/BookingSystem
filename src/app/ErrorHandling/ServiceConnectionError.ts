import {Observable, of, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

export class ServiceConnectionError {
  constructor () {

  }
  public handleError<T>(operation = 'operation', result?: T) { // https://angular.io/tutorial/tour-of-heroes/toh-pt6#error-handling
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      alert(`Service error in ${operation}!`)

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

/* Didnt work as intended */
// public handleError2(error: HttpErrorResponse) { // https://angular.io/guide/http#getting-error-details
//   if (error.status === 0) {
//     // A client-side or network error occurred. Handle it accordingly.
//     console.error('An error occurred:', error.error);
//     console.log('An error occurred:', error.error);
//   } else {
//     // The backend returned an unsuccessful response code.
//     // The response body may contain clues as to what went wrong.
//     console.error(`Backend returned code ${error.status}, body was: `, error.error);
//     console.log(`Backend returned code ${error.status}, body was: `, error.error);
//   }
//   // Return an observable with a user-facing error message.
//   return throwError(() => new Error('Something bad happened; please try again later.'));
// }
