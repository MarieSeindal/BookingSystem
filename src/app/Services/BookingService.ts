import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {map, Observable, of, tap} from 'rxjs';
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

  getBookings(userId: string): Observable<Booking[]> { // Converter datoerString til datoer
    const url = 'https://localhost:7041/booking/'+userId;
    return this.http.get<Booking[]>(url) //
      .pipe(
        map(result => result.map( booking => ({
          id: booking.id,
          userId: booking.userId,
          title: booking.title,
          startDate: stringToDate(booking.startDate as unknown as string),
          endDate: stringToDate(booking.endDate as unknown as string),
          roomId: booking.roomId,
          description: booking.description,
          allDay: booking.allDay
        }))),
        tap(a => console.log(a)),
        catchError(this.error.handleError<Booking[]>('deleteBookings',[]))
      )
  }

  deleteBooking(bookingId: string): Observable<unknown> {
    const url = 'https://localhost:7041/booking/'+bookingId;
    return this.http.delete(url) //
      .pipe(
        catchError(this.error.handleError<Booking[]>('getBookings',[]))
      )
  }

  updateBooking(booking: Booking, bookingId: string): Observable<Booking[]> {
    console.log('Booking update',booking);
    const url = 'https://localhost:7041/booking/'+bookingId;
    return this.http.put<Booking[]>(url, booking, httpOptions) //
      .pipe(
        catchError(this.error.handleError<Booking[]>('putBooking',[]))
      )
  }


}

function stringToDate(date : string): Date {
  return new Date(date);
}
