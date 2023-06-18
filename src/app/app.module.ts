import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {MatToolbarModule} from '@angular/material/toolbar';
import {DocumentationComponent} from './Pages/documentation/documentation.component';
import {HomeComponent} from './Pages/home/home.component';
import {NotFoundComponent} from './Pages/not-found/not-found.component';
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
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}


@NgModule({
  declarations: [
    AppComponent,
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
    RouterOutlet,
    RouterModule.forRoot([ //most specific routes on top
      {path: '', redirectTo: 'login', pathMatch: 'full'}, //
      {path: 'login', component: LoginComponent}, //
      {path: 'app', component: AppLayoutComponent, children:[
          {path: 'home', component: HomeComponent},
          {path: '', redirectTo: 'home', pathMatch: 'full'},
          {path: 'calendar', component: CalendarPageComponent},
          {path: 'booking', component: BookingPageComponent},
          {path: 'documentation', component: DocumentationComponent},
          {path: 'user', component: AddPersonPageComponent},
          {path: 'user/:userId', component: ShowPersonComponent}, // https://stackblitz.com/github/rangle/angular-book-examples/tree/feat-programmatic-route-navigation?file=src%2Fapp%2Fapp.component.html
        ]},

      {path: '**', component: NotFoundComponent}, // for any other not defined paths user may enter.
    ]),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
  }
}
