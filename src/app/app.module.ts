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
import {AddPersonPageComponent} from "./Pages/add-person-page/add-person-page.component";
import {ShowPersonComponent} from "./Pages/add-person-page/show-person/show-person.component";
import {AppLayoutComponent} from './app-layout/app-layout.component';
import {LoginComponent} from './Pages/login/login.component';


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
      {path: '', redirectTo: 'login', pathMatch: 'full'}, //
      {path: 'login', component: LoginComponent}, //
      {path: 'app', component: AppLayoutComponent, children:[
          {path: 'home', component: HomeComponent},
          {path: '', redirectTo: 'home', pathMatch: 'full'},
          {path: 'calendar', component: CalendarPageComponent},
          // {path: 'booking/:userId', component: BookingComponent},
          {path: 'booking', component: BookingPageComponent},
          {path: 'weather', component: WeatherTestComponent},
          {path: 'ng-tutorial', component: NgTutorial},
          {path: 'documentation', component: DocumentationComponent},
          {path: 'user', component: AddPersonPageComponent},
          {path: 'user/:userId', component: ShowPersonComponent}, // https://stackblitz.com/github/rangle/angular-book-examples/tree/feat-programmatic-route-navigation?file=src%2Fapp%2Fapp.component.html
          // {path: 'calendar/:userId', component: CalendarComponent},
        ]},

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
