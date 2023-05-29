import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ServiceConnectionError} from '../ErrorHandling/ServiceConnectionError';
import {User} from '../Components/select-user/user';
import {Booking} from "../Components/booking/booking";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({providedIn: 'root'})
export class UserService {
  connectURL = 'https://localhost:7041/User';
  public error = new ServiceConnectionError();

  constructor(
    private http: HttpClient,
  ) {}

  /* GET User from the service from db */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.connectURL) //
      .pipe(
        catchError(this.error.handleError<User[]>('getAllUsers',[]))
      )
  }

  getUserPermission(userId: string): Observable<boolean> {

    const url = this.connectURL+'/permission/'+userId;

    return this.http.get<boolean>(url) //
      .pipe(
        catchError(this.error.handleError<boolean>('getUserPermission',))
      )
  }

  postUser(person: User): Observable<User[]> {
    const userURLString = 'https://localhost:7041/user/';
    return this.http.post<User[]>(userURLString, person, httpOptions)
      .pipe(
        catchError(this.error.handleError<User[]>(userURLString + person,[]))
      )
  }


  getBooking(): Observable<Booking[]> {
    return this.http.get<Booking[]>('https://localhost:7041/booking'+'/1') // 1 is a test id, need to be replaced later todo;
      .pipe(
        catchError(this.error.handleError<Booking[]>('getBooking',[]))
      )
  }

  postBooking(booking: Booking, userId: string): Observable<Booking[]> {
    const bookUrl = 'https://localhost:7041/booking/'+userId;
    return this.http.post<Booking[]>(bookUrl, booking, httpOptions)
      .pipe(
        catchError(this.error.handleError<Booking[]>(bookUrl + booking,[]))
      )
  }

  getBookings(userId: string): Observable<Booking[]> {
    console.log('Get bookings for user called');
    const url = 'https://localhost:7041/bookings/'+userId;
    return this.http.get<Booking[]>(url) //
      .pipe(
        catchError(this.error.handleError<Booking[]>('getBookings',[]))
      )
  }


}
