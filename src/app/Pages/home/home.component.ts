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

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  bookings: Observable<Booking[]> = of([]);
  public userId: string = "";
  public bookingsFetched: Booking[] = [];


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
    // await this.bookings.forEach(gg => {
    //     gg.forEach(ggg => {
    //       this.bookingsFetched.push(ggg);
    //       console.log('What is this?', ggg);
    //     })
    //   }
    // )

    // await this.bookingService.getBookings(this.userId).subscribe(b=> {
    //   b.forEach(g => {
    //     console.log('booking',g);
    //     this.bookingsFetched.push(g);
    //   })
    // });

    console.log('book raw',this.bookings);
    console.log('f',this.bookingsFetched);
    console.log('f2',typeof this.bookingsFetched,'"',this.bookingsFetched.toString(),'"');


    // this.bookingsFetched.push( this.bookings);

  }

  public onDeleteClick(booking: Booking) {
    this.bookingService
      .deleteBooking(booking.id).subscribe(async res => {
      this.bookings = await this.bookingService.getBookings(this.userId);
      this.ch.detectChanges();
    });
  }

  public onEditClick(booking: Booking) {
    this.bookingService.updateBooking(booking,booking.id).subscribe();

  }

}
