import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {DateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {Booking} from "./booking";
import {BookingService} from "../../Services/BookingService";
import {ToastrService} from "ngx-toastr";

export type dateType = 'start' | 'end';

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

  formGroup = this._formBuilder.group({
    title: [''],
    date: ['', Validators.required],
    duration: ['', Validators.required],
    time: ['', Validators.required],
    room: ['', Validators.required],
    description: [''],
    allDay: [false],
  });

  public set isDisabled(value: boolean) { // https://angular.io/api/forms/FormControl#reset & https://stackoverflow.com/questions/50220643/disable-angular-5-input-fields-correct-way
    this._allDay = value;
    if(value) {
      this.formGroup.controls['time'].disable();
      this.formGroup.controls['duration'].disable();
      this.formGroup.controls['time'].reset();
      this.formGroup.controls['duration'].reset();
    } else {
      this.formGroup.controls['time'].enable();
      this.formGroup.controls['duration'].enable();
    }
  }

  constructor(
    private _formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private toast: ToastrService,
    public bookingService: BookingService,
  ){
    // this.dateAdapter.setLocale('da'); //Should be smart, but it messes with the date picker input
  }

  public submitBooking(formGroup: FormGroup){

    const temp: any = 'temp';

    console.log('TEST:',formGroup.controls['date'].value, typeof formGroup.controls['date'].value);


    console.log('ALLDAY:',formGroup.controls['allDay'].value, formGroup.controls['time'].value);

    console.log('Start',this.convertDate(formGroup.controls['date'].value, formGroup.controls['time'].value, "start"));
    console.log('End',this.convertDate(formGroup.controls['date'].value, formGroup.controls['time'].value, "end", formGroup.controls['duration'].value));

    const booking: Booking = {
      id: temp,
      userId: temp,
      title: formGroup.controls['title'].value,
      startDate: this.convertDate(formGroup.controls['date'].value, formGroup.controls['time'].value, "start"),
      endDate: this.convertDate(formGroup.controls['date'].value, formGroup.controls['time'].value, "end", formGroup.controls['duration'].value),
      roomId: formGroup.controls['room'].value, //Math.round(Math.random()*100), // for evt test purpose
      description: formGroup.controls['description'].value,
      allDay: this._allDay,
    }

    console.log('Saved booking object', booking);


    const userID: any = sessionStorage.getItem('user') ?? 'ERROR in userID';

    if (formGroup.valid) {
      this.bookingService.postBooking(booking, userID)
        .subscribe((res) => {
          console.log('response form post booking',res);

          this.toast.success('Booking oprettet','Success', {
            timeOut: 2000,
            disableTimeOut: false,
          });
        });
    } else {
      this.toast.info('Udfyld venligst de obligatoriske felter')
    }
  }

  public switchAllDay(){
    this.isDisabled = !this._allDay;
  }

  public convertDate(date: Date, time: string, startOrEnd: dateType, duration?: number) {

    if (this._allDay) {
      console.log('allday in f', this._allDay);
      if (startOrEnd === "end"){ // if all day and the end date is being defined
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59);
      }
      return date; // if all day, then no string = return the date with no changes.
    }
    const timeArray = time.split(':');

    if (startOrEnd === "end")  {
      if (duration !== null && duration !== undefined) {

      }
      const extraMinutes = duration? duration%60 : 0;
      const extraHours = duration? Math.trunc(duration/60) : 0;
      console.log('extra hours and minutes',extraHours,extraMinutes);

      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(timeArray[0])+extraHours, Number(timeArray[1])+extraMinutes);
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(timeArray[0]), Number(timeArray[1]));
  }
}
