import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {WeatherTestComponent} from './Components/weather-test/weather-test.component';
import {NgTutorial} from "./Components/ng-tutorial/ng-tutorial";
import {RouterModule, RouterOutlet} from "@angular/router";
import {BookingComponent} from "./Components/booking/booking.component";
import {MatToolbarModule} from '@angular/material/toolbar';
import {DocumentationComponent} from './Components/documentation/documentation.component';
import {HomeComponent} from './Components/home/home.component';
import {NotFoundComponent} from './Components/not-found/not-found.component';
import {CalendarPageComponent} from './Pages/calendar-page/calendar-page.component';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

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
      {path: 'calendar', component: CalendarPageComponent},
      // {path: 'booking/:userId', component: BookingComponent},
      {path: 'booking', component: BookingComponent},
      {path: 'weather', component: WeatherTestComponent},
      {path: 'ng-tutorial', component: NgTutorial},
      {path: 'documentation', component: DocumentationComponent},
      {path: '**', component: NotFoundComponent}, // for any other not defined paths user may enter.
    ]),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
  }
}
