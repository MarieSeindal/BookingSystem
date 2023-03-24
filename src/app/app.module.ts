import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherTestComponent } from './Components/weather-test/weather-test.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WeatherTestComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
