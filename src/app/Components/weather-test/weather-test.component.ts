import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {WeatherTestService} from '../../Services/weather-test.service';
import {Weather} from './weather';
import {Observable, of} from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'weather-test',
  templateUrl: './weather-test.component.html',
  styleUrls: ['./weather-test.component.scss'],
  imports: [CommonModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherTestComponent {

  weather: Observable<Weather[]> = of([]);

  // @Output() // do I need an event emitter here?
  // public personClicked = new EventEmitter<MouseEvent>();

  constructor(
    private weatherService: WeatherTestService,
    private _formBuilder: FormBuilder,
  ) {}

  // public clickAddPerson($event: MouseEvent) { // either call a function or emit an event
  //
  //   // this.personService.postPerson();
  // }

  ngOnInit() {
    this.weather = this.weatherService.getWeather();
  }
}
