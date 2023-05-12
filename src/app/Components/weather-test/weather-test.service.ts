import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Weather} from './weather';
import {ServiceConnectionError} from '../../ErrorHandling/ServiceConnectionError';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({providedIn: 'root'})
export class WeatherTestService {
  weatherURL = 'https://localhost:7041/weatherforecast';
  public error = new ServiceConnectionError();

  constructor(
    private http: HttpClient
  ) {}

  /* GET weather from the server */
  getWeather(): Observable<Weather[]> {
    return this.http.get<Weather[]>(this.weatherURL)
      .pipe(
        catchError(this.error.handleError<Weather[]>('getWeather',[]))
      )
  }
}
