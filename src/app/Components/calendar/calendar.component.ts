import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarEvent, CalendarModule, CalendarView} from "angular-calendar";
import {EventColor} from "calendar-utils";

export const colors: any = {
  green: {
    primary: '#8DC63F',
    secondary: '#dcf3bc',
  },
};


@Component({
  selector: 'calendar',
  standalone: true,
    imports: [CommonModule, CalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit{

  view: CalendarView = CalendarView.Month;

  public color: EventColor | undefined;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Editable event',
      color: colors.green,
      start: new Date(),
      actions: [
        {
          label: '<i class="fas fa-fw fa-pencil-alt"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            console.log('Edit event', event);
          },
        },
      ],
    },
    {
      title: 'Deletable event',
      color: colors.green,
      start: new Date(),
      actions: [
        {
          label: '<i class="fas fa-fw fa-trash-alt"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            console.log('Event deleted', event);
          },
        },
      ],
    },
    {
      title: 'Non editable and deletable event',
      color: colors.green,
      start: new Date(),
    },
  ];

  public testNum = 2;

  // public dayInMonth = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  public dayInMonth = this.makeMonthArray(31);

  ngOnInit(): void {
    this.dayInMonth = this.makeMonthArray(1);
  }

  public makeMonthArray(month:number) {

    let days = 0;

    switch (month){ // to get the variable months
      case 1:
        days = 31;
        break;
    }

    let monthDays = [];

    for (let i = 0; i < days; i++) {
      monthDays.push(i+1)
    }

    return monthDays;
  }

}
