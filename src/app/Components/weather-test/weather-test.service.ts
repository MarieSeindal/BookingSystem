import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Weather} from './weather';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class WeatherTestService {
  weatherURL = 'localhost:7143/WeatherForecast';

  constructor(
    private http: HttpClient
  ) {}

  /** GET heroes from the server */
  getWeather(): Observable<Weather[]> {
    return this.http.get<Weather[]>(this.weatherURL)
  }
}
