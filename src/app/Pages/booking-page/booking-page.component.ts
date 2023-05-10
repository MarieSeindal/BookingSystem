import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookingComponent} from '../../Components/booking/booking.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'booking-page',
  standalone: true,
  imports: [CommonModule, BookingComponent, MatFormFieldModule, MatSelectModule, MatCardModule, MatDatepickerModule],
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingPageComponent {

}
