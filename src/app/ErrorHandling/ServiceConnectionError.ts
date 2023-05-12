import {Observable, of} from 'rxjs';

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
