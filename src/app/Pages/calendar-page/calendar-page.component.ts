import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarComponent} from '../../Components/calendar/calendar.component';
import {
  CalendarOptionsBarComponent
} from '../../Components/calendar/calendar-options-bar/calendar-options-bar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [CommonModule, CalendarComponent, CalendarOptionsBarComponent, MatDatepickerModule, MatCardModule],
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPageComponent {
  selectedDate: any;
  name = 'Angular 6';

  onSelect(event: any){
    console.log(event);
    this.selectedDate= event;
  }


}
