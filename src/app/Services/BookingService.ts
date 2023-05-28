import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ServiceConnectionError} from '../ErrorHandling/ServiceConnectionError';
import {Booking} from '../Components/booking/booking';

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

  /* GET Booking from the service from db */
  getBooking(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.connectURL+'/1') // 1 is a test id, need to be replaced later todo;
      .pipe(
        catchError(this.error.handleError<Booking[]>('getBooking',[]))
      )
  }

  postBooking(booking: Booking, userId: string): Observable<Booking[]> {
    const bookUrl = 'https://localhost:7041/booking/'+userId;
    console.log('url',bookUrl);

    return this.http.post<Booking[]>(bookUrl, booking, httpOptions)
      .pipe(
        catchError(this.error.handleError<Booking[]>(bookUrl + booking,[]))
      )
  }
}