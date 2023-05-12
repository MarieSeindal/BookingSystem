import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Person} from './person';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({providedIn: 'root'})
export class PersonTestService {
  connectURL = 'https://localhost:7041/person1';

  constructor(
    private http: HttpClient
  ) {}

  /** GET person from the server from db */
  getPerson(): Observable<Person[]> {
    return this.http.get<Person[]>(this.connectURL)
      .pipe(
        catchError(this.handleError<Person[]>('getPerson1',[]))
      )
  }
  private handleError<T>(operation = 'operation', result?: T) { // https://angular.io/tutorial/tour-of-heroes/toh-pt6#error-handling
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      alert('Service connection error!')

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
