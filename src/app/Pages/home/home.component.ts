import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Booking} from "../../Components/booking/booking";
import {BookingService} from "../../Services/BookingService";
import {Observable, of} from "rxjs";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {BookingEditComponent} from '../../Components/booking-edit/booking-edit.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink, BookingEditComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  bookings: Observable<Booking[]> = of([]);
  public userId: string = "";
  public bookingsFetched: Booking[] = [];
  public bookingForEdit: Booking | undefined;


  protected readonly sessionStorage = sessionStorage;

  constructor (
    private bookingService: BookingService,
    private ch: ChangeDetectorRef,
  ) {}

  public async ngOnInit() {
    this.userId = sessionStorage.getItem('user') ?? 'Error in fetching user id';

    this.bookings = await this.bookingService.getBookings(this.userId);
    this.bookings.subscribe(f=>{
      this.ch.detectChanges();
    });
  }

  public onDeleteClick(booking: Booking) {
    this.bookingService
      .deleteBooking(booking.id).subscribe(async res => {
      this.bookings = await this.bookingService.getBookings(this.userId);
      this.ch.detectChanges();
    });
  }

  public onEditClick(booking: Booking) {
    this.bookingForEdit = booking;

  }

}
