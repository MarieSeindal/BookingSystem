import {AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Booking} from "../../Components/booking/booking";
import {BookingService} from "../../Services/BookingService";
import {Observable, of} from "rxjs";

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterContentInit, AfterViewInit{

  bookings: Observable<Booking[]> = of([]);
  public userId: string = "";
  public bookingsFetched: Booking[] = [];


  protected readonly sessionStorage = sessionStorage;

  constructor (
    private bookingService: BookingService,
  ) {}

  public async ngOnInit() {
    this.userId = sessionStorage.getItem('user') ?? 'Error in fetching user id';

    this.bookings = await this.bookingService.getBookings(this.userId);

    // await this.bookings.forEach(gg => {
    //     gg.forEach(ggg => {
    //       // this.bookingsFetched.push(ggg);
    //       console.log('What is this?', ggg);
    //     })
    //   }
    // )

    // this.bookingService.getBookings(this.userId).subscribe(b=> {
    //   b.forEach(g => {
    //     // console.log('g',g);
    //     this.bookingsFetched.push(g);
    //   })
    // });

    console.log('book raw',this.bookings);
    console.log('f',this.bookingsFetched);
    console.log('f2',typeof this.bookingsFetched,'"',this.bookingsFetched.toString(),'"');


    // this.bookingsFetched.push( this.bookings);

  }

  ngAfterContentInit() {
    // if(this.bookingsFetched.toString() === ''){ // try fetching again
    //   this.bookings = this.bookingService.getBookings(this.userId);
    //   console.log('g',this.bookingsFetched);
    // }
  }
  ngAfterViewInit() {
  }

}
