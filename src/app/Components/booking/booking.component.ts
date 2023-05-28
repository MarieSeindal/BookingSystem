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
  public allDay = false;
  public value ='';
  public selectedDate: Date | null = new Date();
  public formDate = new FormControl(this.selectedDate);
  public startDate = new FormControl(new Date());

  formGroup = this._formBuilder.group({
    title: [''],
    date: ['', Validators.required],
    duration: ['', Validators.required],
    time: ['', Validators.required],
    room: ['', Validators.required],
    description: [''],
    // acceptTerms: ['', Validators.requiredTrue],
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
    private toast: ToastrService,
  public bookingService: BookingService,
  ){
    this.dateAdapter.setLocale('da');
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
    console.log('Booking form', formGroup.value);

    // Check booking info
    // let booking: any;

    const temp: any = 'temp';

    const booking: Booking = {
      id: temp,
      userId: temp,
      title: formGroup.controls['title'].value,
      startDate: this.convertDate(formGroup.controls['date'].value, formGroup.controls['time'].value, "start"),
      endDate: this.convertDate(formGroup.controls['date'].value, formGroup.controls['time'].value, "end", formGroup.controls['duration'].value),
      roomId: formGroup.controls['room'].value, //Math.round(Math.random()*100), // for evt test purpose
      description: formGroup.controls['description'].value,
    }

    console.log('types:\n',
      'title', typeof booking.title, booking.title, '\n',
      'start', typeof booking.startDate, booking.startDate, '\n',
      'end', typeof booking.endDate, booking.endDate, '\n',
      'room', typeof booking.roomId, booking.roomId, '\n',
      'descr', typeof booking.description, booking.description, '\n',
      'all', this._allDay, '\n',
    )

    console.log('Booking', booking);
    console.log('time', typeof formGroup.controls['time'].value, formGroup.controls['time'].value);
    console.log('TESTING DATE', new Date(2023,10,23,10,65));


    const userID: any = sessionStorage.getItem('user') ?? 'ERROR in userID';

    this.bookingService.postBooking(booking, userID)      .subscribe((res) => {
      console.log('response form post',res);
      // window.location.reload();

      this.toast.success('Booking created','Success', {
        timeOut: 2000,
        disableTimeOut: false,
      });
    });
    console.log('After post');

    // alert(JSON.stringify(formGroup.value, null, 2));
  }

  public switchAllDay(){
    console.log('All day swap to', !this._allDay);
    this.isDisabled = !this._allDay;
    this.allDay = !this.allDay;
  }

  public convertDate(date: Date, time: string, startOrEnd: dateType, duration?: number) {

    console.log('Year', date.getFullYear());

    if (this._allDay) {
      if (startOrEnd === "end"){ // if all day and the end date is being defined
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59);
      }
      return date; // if all day, then no string = return the date with no changes.
    }
    const timeArray = time.split(':');
    if (startOrEnd === "end")  {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(timeArray[0]), Number(timeArray[1]));
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(timeArray[0]), Number(timeArray[1]));
  }
}
