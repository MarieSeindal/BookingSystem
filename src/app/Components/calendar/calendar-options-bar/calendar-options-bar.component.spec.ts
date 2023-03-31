import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarOptionsBarComponent } from './calendar-options-bar.component';

describe('CalendarOptionsBarComponent', () => {
  let component: CalendarOptionsBarComponent;
  let fixture: ComponentFixture<CalendarOptionsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CalendarOptionsBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarOptionsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
