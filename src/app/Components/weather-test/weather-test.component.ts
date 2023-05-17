import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {WeatherTestService} from './weather-test.service';
import {Weather} from './weather';
import {async, Observable, of} from 'rxjs';
import {Person} from './person';
import {PersonTestService} from './personTestService';
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
  person: Observable<Person[]> = of([]);

  private listOfPersons:any[] = [];

  // @Output() // do I need an event emitter here?
  // public personClicked = new EventEmitter<MouseEvent>();


  constructor(
    private weatherService: WeatherTestService,
    private personService: PersonTestService,
    private _formBuilder: FormBuilder,
  ) {}


  formPerson = this._formBuilder.group({
    firstName: [''],
    lastName: [''],
  });

  public submitPerson(formPers: FormGroup) {

    // console.log('First person from form', formPers.value);

    const fname = formPers.get('firstName')?.value;
    console.log('fname',fname);

    // const fname = formPers.value.get('firstName'); // nope
    // const fname = formPers.get('firstName')?.value; // yes after im not dumb xD
    // const fname =formPers.controls['firstname'].value; // nope

    const lname =formPers.get('lastName')?.value;

    const id = Math.round(Math.random()*100);

    const pers: Person = {id: id, fName: fname, lName: lname};

    console.log('object', pers);

    //pers.fName=formPers.controls['firstname'].value;

    // call service
    this.personService.postPerson(pers)
      .subscribe(p => this.listOfPersons.push(p));

  }

  // public clickAddPerson($event: MouseEvent) { // either call a function or emit an event
  //
  //   // this.personService.postPerson();
  // }

  ngOnInit() {
    this.weather = this.weatherService.getWeather();
    this.person = this.personService.getPerson();
  }

}
