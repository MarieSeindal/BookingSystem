import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {DateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';


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
    MatCardModule,
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent {

  protected _allDay = false;
  public allDay = false;
  public value ='';
  public selectedDate: Date | null = new Date();
  public formDate = new FormControl(this.selectedDate);
  public startDate = new FormControl(new Date());

  formGroup = this._formBuilder.group({
    title: [''],
    date: [''],
    time: ['', Validators.required],
    room: ['', Validators.required],
    description: [''],
    // acceptTerms: ['', Validators.requiredTrue],
  });


  public set isDisabled(value: boolean) {
    this._allDay = value;
    if(value) {
      this.formGroup.controls['time'].disable();
      this.formGroup.controls['time'].reset();
    } else {
      this.formGroup.controls['time'].enable();
    }
  }
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

  constructor(
    private _formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
  ){
    this.dateAdapter.setLocale('da')
  }

  // public dateToForm() { // Not used
  //   this.formDate = new FormControl(this.selectedDate);
  //   return this.formDate;
  // }
  //
  // public formToDate(){
  //   this.selectedDate = this.formDate? this.formDate.value : this.selectedDate;
  //   return this.selectedDate;
  // }



  public submitBooking(formGroup: FormGroup){
    console.log('Booking', formGroup.value);

    // Check booking info


    //
    // alert(JSON.stringify(formGroup.value, null, 2));
  }
  public picker: any;

  public switchAllDay(){
    console.log('All day swap to', !this._allDay);
    this.isDisabled = !this._allDay;
    this.allDay = !this.allDay;
  }
}
