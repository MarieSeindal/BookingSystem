import { Component } from '@angular/core';
import {WeatherTestService} from './weather-test.service';
import {Weather} from './weather';

@Component({
  selector: 'weather-test',
  templateUrl: './weather-test.component.html',
  styleUrls: ['./weather-test.component.css']
})
export class WeatherTestComponent {

  weather: Weather[] = [];

  constructor(
    private weatherService: WeatherTestService,
  ) {}

  ngOnInit() {
    this.getWeather();
  }

  getWeather(): void {
    this.weatherService.getWeather()
      .subscribe(weather => (this.weather = weather));
  }

}
