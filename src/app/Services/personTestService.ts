import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Person} from '../Components/weather-test/person';
import {ServiceConnectionError} from '../ErrorHandling/ServiceConnectionError';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({providedIn: 'root'})
export class PersonTestService {
  connectURL = 'https://localhost:7041/person1';
  public error = new ServiceConnectionError();

  constructor(
    private http: HttpClient,
  ) {}

  /* GET person from the server from db */
  getPerson(): Observable<Person[]> {
    return this.http.get<Person[]>(this.connectURL)
      .pipe(
        catchError(this.error.handleError<Person[]>('getPerson1',[]))
      )
  }

  postPerson(person: Person): Observable<Person[]> {
    const userURLString = 'https://localhost:7041/user/';
    return this.http.post<Person[]>(userURLString, person, httpOptions)
      .pipe(
        catchError(this.error.handleError<Person[]>(userURLString + person,[]))
      )
  }
}
