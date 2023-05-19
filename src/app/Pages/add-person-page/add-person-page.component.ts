import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Person} from "../../Components/weather-test/person";
import {PersonTestService} from "../../Components/weather-test/personTestService";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'add-person-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-person-page.component.html',
  styleUrls: ['./add-person-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPersonPageComponent {

  private listOfPersons:any[] = [];

  constructor(
    private personService: PersonTestService,
    private _formBuilder: FormBuilder,
    private router: Router,
    ){
  }

  formPerson = this._formBuilder.group({
    firstName: [''],
    lastName: [''],
  });

  public submitPerson(formPers: FormGroup) {

    // console.log('First person from form', formPers.value);

    const fname = formPers.get('firstName')?.value;
    const lname =formPers.get('lastName')?.value;
    const id = Math.round(Math.random()*100);
    const pers: Person = {id: id, fName: fname, lName: lname};

    console.log('object', pers);

    //pers.fName=formPers.controls['firstname'].value;

    // call service
    this.personService.postPerson(pers, id)
      .subscribe((res) => {
        console.log('response form post',res);
      });

    this.router.navigate(['/user', id]);

    // this.router.navigate(['/user'], { queryParams: { user: id } }); // this uses params instead. I'm ok with just route

  }

}
