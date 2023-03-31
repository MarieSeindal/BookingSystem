import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'calendar-options-bar',
  standalone: true,
	imports: [CommonModule, MatToolbarModule],
  templateUrl: './calendar-options-bar.component.html',
  styleUrls: ['./calendar-options-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarOptionsBarComponent {

}
