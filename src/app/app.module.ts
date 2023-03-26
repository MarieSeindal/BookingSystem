import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { WeatherTestComponent } from './Components/weather-test/weather-test.component';
import { App } from './app';
import { RouterModule } from "@angular/router";
import { Calendar } from './Components/calendar/calendar';
import { Booking } from './Components/booking/booking';
import { NgTutorial } from './Components/ng-tutorial/ng-tutorial';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    App,
    Calendar,
    Booking,
    NgTutorial,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WeatherTestComponent,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([ //most spevfiic routes on top
      // {path: '', component: HomePage}, //Default page or home page
      {path: 'calendar/:userId', component: Calendar},
      {path: 'booking/:userId', component: Booking},
      {path: 'ng-tutorial', component: NgTutorial},
      // {path: '**', component: NotFound}, // for any other not defined paths user may enter.
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
