import {
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnInit, Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Booking} from '../booking/booking';
import {BookingService} from '../../Services/BookingService';
import {ToastrService} from 'ngx-toastr';
import {dateType} from '../booking/booking.component';
import { parse } from 'date-fns';

@Component({
  selector: 'booking-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss'],
})

export class BookingEditComponent {

  @Input()
  public set booking(booking: Booking) {
    this.fillForm(booking);
  };

  @Output()
  public updatedBooking = new EventEmitter<boolean>();

  public id = '';
  public _allDay = false
  public set allDay(b: boolean){
    this._allDay = b;
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _bookingService: BookingService,
    private toast: ToastrService,
    private ch: ChangeDetectorRef,

  ) {}

  formGroup = this._formBuilder.group({
    title: [''],
    date: ['', Validators.required],
    duration: ['', Validators.required],
    time: ['', Validators.required],
    room: ['0', Validators.required],
    description: [''],
    allDay: [false],
  });

  public fillForm(booking: Booking) {

    this.formGroup.reset(); // clean up before writing

    this.id = booking.id;

    const formatString = 'yyyy-MM-ddHH:mm:ss';
    const tempStartDate = parse(booking.startDate.toString().replace('T',''),formatString,new Date());
    const tempEndDate = parse(booking.endDate.toString().replace('T',''),formatString,new Date());

    const timeduration = (tempEndDate.getTime() - tempStartDate.getTime())/(1000*60);

    this.formGroup.controls['title'].setValue(booking.title);
    this.formGroup.controls['date'].setValue(booking.startDate.toString());
    this.formGroup.controls['duration'].setValue(timeduration.toString());
    this.formGroup.controls['time'].setValue(this.makeTimeString(tempStartDate));
    this.formGroup.controls['room'].setValue(booking.roomId.toString());
    this.formGroup.controls['description'].setValue(booking.description);
    this.formGroup.controls['allDay'].setValue(booking.allDay);
    this.isDisabled = booking.allDay;

  }

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

  public switchAllDay(){
    this.isDisabled = !this._allDay;
  }

  public makeTimeString(date: Date) {
    let minutes: string = '';
    let hours: string = '';

    if (date.getMinutes() < 10) {
      minutes = '0'+date.getMinutes()
    } else {
      minutes = date.getMinutes().toString();
    }
    if (date.getHours() < 10) {
      hours = '0'+date.getHours()
    } else {
      hours = date.getHours().toString();
    }

    return hours+':'+minutes;
  }

  public submitBooking(formGroup: FormGroup){

    const temp: any = 'temp';

    console.log('TEST:',formGroup.controls['date'].value, formGroup.controls['time'].value);

    const userID: any = sessionStorage.getItem('user') ?? 'ERROR in userID';

    const booking: Booking = {
      id: this.id,
      userId: temp,
      title: formGroup.controls['title'].value,
      startDate: this.convertDate(formGroup.controls['date'].value, formGroup.controls['time'].value, "start"),
      endDate: this.convertDate(formGroup.controls['date'].value, formGroup.controls['time'].value, "end", formGroup.controls['duration'].value),
      roomId: Number(formGroup.controls['room'].value), //Math.round(Math.random()*100), // for evt test purpose
      description: formGroup.controls['description'].value,
      allDay: this._allDay,
    }

    console.log('Booking to be updted', booking);



    if (formGroup.valid) {
      this._bookingService.updateBooking(booking,booking.id).subscribe(res => {

        console.log('response form update booking',res);
        // window.location.reload();
        this.updatedBooking.emit(true); // telling parent that the update happened

        this.toast.success('Booking opdateret','Success', {
          timeOut: 2000,
          disableTimeOut: false,
        });
        }
      );
    } else {
      this.toast.info('Udfyld venligst de obligatoriske felter')
    }
  }

  public convertDate(date: Date, time: string, startOrEnd: dateType, duration?: number) {


    const formatString = 'yyyy-MM-ddHH:mm:ss';
    const tempDate = parse(date.toString().replace('T',''),formatString,new Date());
    date = tempDate;

    console.log('Dato debug',typeof date);
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
  protected readonly Date = Date;
}
