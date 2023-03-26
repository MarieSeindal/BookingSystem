import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {WeatherTestService} from './weather-test.service';
import {Weather} from './weather';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'weather-test',
  templateUrl: './weather-test.component.html',
  styleUrls: ['./weather-test.component.scss'],
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherTestComponent {

  weather: Observable<Weather[]> = of([]);

  constructor(
    private weatherService: WeatherTestService,
  ) {}

  ngOnInit() {
    this.weather = this.weatherService.getWeather();
  }

}
