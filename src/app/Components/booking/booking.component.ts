import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {DateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'booking',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent {

  public allDay = false;

  isChecked = true;
  formGroup = this._formBuilder.group({
    title: [''],
    date: ['', Validators.required],
    time: [''],
    room: ['', Validators.required],
    description: [''],
    // acceptTerms: ['', Validators.requiredTrue],
  });

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

}
