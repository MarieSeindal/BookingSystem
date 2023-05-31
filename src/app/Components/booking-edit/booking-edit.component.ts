import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Booking} from '../booking/booking';
import {BookingService} from '../../Services/BookingService';
import {ToastrService} from 'ngx-toastr';
import {dateType} from '../booking/booking.component';

@Component({
  selector: 'booking-edit',
  standalone: true,
	imports: [CommonModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatSlideToggleModule, ReactiveFormsModule],
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss'],
})

export class BookingEditComponent implements OnInit {

  @Input()
  public set booking(booking: Booking) {
    this.fillForm(booking);
  };

  public selectedRoom = '2';

  public _allDay = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _bookingService: BookingService,
    private toast: ToastrService,
    private ch: ChangeDetectorRef,

  ) {}

  formGroup = this._formBuilder.group({
    title: [''],
    date: ['', Validators.required],
    duration: [1, Validators.required],
    time: ['', Validators.required],
    room: ['', Validators.required],
    description: [''],
    allDay: [''],
  });

  public fillForm(booking: Booking) {

    this.formGroup.reset();

    // this.formGroup.patchValue()


    this.formGroup.controls['title'].setValue(booking.title);
    this.formGroup.controls['date'].setValue(booking.startDate.toString());
    this.formGroup.controls['duration'].setValue(booking.duration);
    this.formGroup.controls['time'].setValue(booking.startDate.toString());
    this.formGroup.controls['room'].setValue(booking.roomId.toString());
    this.formGroup.controls['description'].setValue(booking.description);

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    if (this.booking !== undefined && this.booking.startDate !== undefined && this.booking.endDate !== undefined) {

      console.log(this.booking?.endDate?.getTime());

      const time = this.booking.startDate.getHours()+':'+this.booking.startDate.getMinutes();

      console.log(' Time', time);
      console.log(this._allDay, '!==', this.booking.allDay);
      if (this._allDay !== this.booking.allDay) {
        this.switchAllDay();
      }



    }
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

  public submitBooking(formGroup: FormGroup){

    // Check booking info
    // let booking: any;

    const temp: any = 'temp';

    console.log('TEST:',formGroup.controls['date'].value, formGroup.controls['time'].value);

    const booking: Booking = {
      id: temp,
      userId: temp,
      title: formGroup.controls['title'].value,
      startDate: this.convertDate(formGroup.controls['date'].value, formGroup.controls['time'].value, "start"),
      endDate: this.convertDate(formGroup.controls['date'].value, formGroup.controls['time'].value, "end", formGroup.controls['duration'].value),
      roomId: formGroup.controls['room'].value, //Math.round(Math.random()*100), // for evt test purpose
      description: formGroup.controls['description'].value,
      allDay: formGroup.controls['allDay'].value,
      duration: formGroup.controls['duration'].value,
    }


    const userID: any = sessionStorage.getItem('user') ?? 'ERROR in userID';

    if (formGroup.valid) {
      this._bookingService.updateBooking(booking,booking.id).subscribe(res => {

        console.log('response form update booking',res);
        // window.location.reload();

        this.toast.success('Booking oprettet','Success', {
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
  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }
  protected readonly Date = Date;
}
