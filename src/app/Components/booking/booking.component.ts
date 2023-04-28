import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {DateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'booking',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent {

  public allDay = false;
  public value ='';

  isChecked = true;
  formGroup = this._formBuilder.group({
    title: [''],
    date: ['', Validators.required],
    time: new FormControl({value: '', disabled: this.getAllDay()}),
    room: ['', Validators.required],
    description: [''],
    // acceptTerms: ['', Validators.requiredTrue],
  });

  /* Not used, but good to show manipulation of form-group */
  // public myError = (controlName: string, errorName: string) =>{
  //
  //   switch (controlName) {
  //     case 'room':
  //       return this.formGroup.controls.room.hasError('Please select room');
  //   }
  //
  //   for (let controlsKey in this.formGroup.controls) {
  //     console.log(controlsKey, 'c key');
  //   }
  //
  //   return null;
  // }

  constructor(private _formBuilder: FormBuilder) {}

  public submitBooking(formGroup: FormGroup){
    alert(JSON.stringify(formGroup.value, null, 2));

  }


  selected = 'option2';
  disableSelect = new FormControl(false);

  public picker: any;

  public switchAllDay(){
    console.log('All day swap to', !this.allDay);
    this.allDay = !this.allDay;
  }
  public  getAllDay (): boolean {
    return this.allDay;
  }

}
