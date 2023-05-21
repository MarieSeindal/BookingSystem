import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ServiceConnectionError} from '../../ErrorHandling/ServiceConnectionError';
import {Booking} from './booking';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({providedIn: 'root'})
export class BookingService {
  connectURL = 'https://localhost:7041/booking';
  public error = new ServiceConnectionError();

  constructor(
    private http: HttpClient,
  ) {}

  /* GET person from the server from db */
  getPerson(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.connectURL+'/1') // 1 is a test id, need to be replaced later todo;
      .pipe(
        catchError(this.error.handleError<Booking[]>('getPerson1',[]))
      )
  }

  postPerson(person: Booking, id: number): Observable<Booking[]> {
    const userURLString = 'https://localhost:7041/user/'+id;
    return this.http.post<Booking[]>(userURLString, person, httpOptions)
      .pipe(
        catchError(this.error.handleError<Booking[]>(userURLString + person,[]))
      )
  }
}
