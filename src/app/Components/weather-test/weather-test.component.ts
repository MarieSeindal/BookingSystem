import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {WeatherTestService} from './weather-test.service';
import {Weather} from './weather';
import {async, Observable, of} from 'rxjs';
import {Person} from './person';
import {PersonTestService} from './personTestService';

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
  person: Observable<Person[]> = of([]);

  constructor(
    private weatherService: WeatherTestService,
    private personService: PersonTestService,
  ) {}

  ngOnInit() {
    this.weather = this.weatherService.getWeather();
    this.person = this.personService.getPerson();
  }

}
