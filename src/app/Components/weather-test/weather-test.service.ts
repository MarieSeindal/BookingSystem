import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Weather} from './weather';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({providedIn: 'root'})
export class WeatherTestService {
  weatherURL = 'https://localhost:7041/weatherforecast';

  constructor(
    private http: HttpClient
  ) {}

  /** GET weather from the server */
  getWeather(): Observable<Weather[]> {
    return this.http.get<Weather[]>(this.weatherURL)
      .pipe(
        catchError(this.handleError<Weather[]>('getWeather',[]))
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
