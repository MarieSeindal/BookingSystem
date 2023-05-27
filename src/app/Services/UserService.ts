import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ServiceConnectionError} from '../ErrorHandling/ServiceConnectionError';
import {User} from '../Components/select-user/user';

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
    console.log('url',url);

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
}
