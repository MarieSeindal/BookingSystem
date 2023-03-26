import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'booking',
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class Booking {

  constructor(
    private http: HttpClient
  ) {
  }

  public loadweather() {
    this.http
      .get('https://localhost:7143/WeatherForecast')
      .subscribe((response) => {
        alert(JSON.stringify(response))
      }
  )
  }

}
