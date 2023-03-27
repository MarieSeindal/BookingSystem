import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {WeatherTestComponent} from './Components/weather-test/weather-test.component';
import {NgTutorial} from "./Components/ng-tutorial/ng-tutorial";
import {RouterModule, RouterOutlet} from "@angular/router";
import {CalendarComponent} from "./Components/calendar/calendar.component";
import {BookingComponent} from "./Components/booking/booking.component";
import {MatToolbarModule} from '@angular/material/toolbar';
import {DocumentationComponent} from './Components/documentation/documentation.component';
import {HomeComponent} from './Components/home/home.component';
import {NotFoundComponent} from './Components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NgTutorial,
  ],
	imports: [
		BrowserModule,
		HttpClientModule,
		WeatherTestComponent,
		RouterOutlet,
		RouterModule.forRoot([ //most specific routes on top
			{path: '', component: HomeComponent}, //Default page or home page
			// {path: 'calendar/:userId', component: CalendarComponent},
			{path: 'calendar', component: CalendarComponent},
			// {path: 'booking/:userId', component: BookingComponent},
			{path: 'booking', component: BookingComponent},
			{path: 'weather', component: WeatherTestComponent},
			{path: 'ng-tutorial', component: NgTutorial},
			{path: 'documentation', component: DocumentationComponent},
			{path: '**', component: NotFoundComponent}, // for any other not defined paths user may enter.
		]),
		MatToolbarModule,
	],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
