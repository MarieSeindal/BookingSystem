import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {WeatherTestComponent} from './Components/weather-test/weather-test.component';
import {NgTutorial} from "./Components/ng-tutorial/ng-tutorial";
import {RouterModule, RouterOutlet} from "@angular/router";
import {MatToolbarModule} from '@angular/material/toolbar';
import {DocumentationComponent} from './Components/documentation/documentation.component';
import {HomeComponent} from './Components/home/home.component';
import {NotFoundComponent} from './Components/not-found/not-found.component';
import {CalendarPageComponent} from './Pages/calendar-page/calendar-page.component';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {BookingPageComponent} from './Pages/booking-page/booking-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    NgTutorial,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    WeatherTestComponent,
    RouterOutlet,
    RouterModule.forRoot([ //most specific routes on top
      {path: '', component: HomeComponent}, //Default page or home page
      // {path: 'calendar/:userId', component: CalendarComponent},
      {path: 'calendar', component: CalendarPageComponent},
      // {path: 'booking/:userId', component: BookingComponent},
      {path: 'booking', component: BookingPageComponent},
      {path: 'weather', component: WeatherTestComponent},
      {path: 'ng-tutorial', component: NgTutorial},
      {path: 'documentation', component: DocumentationComponent},
      {path: '**', component: NotFoundComponent}, // for any other not defined paths user may enter.
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
  }
}
