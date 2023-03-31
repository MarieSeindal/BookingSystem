import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarComponent} from '../../Components/calendar/calendar.component';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
	imports: [CommonModule, CalendarComponent],
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPageComponent {

}
