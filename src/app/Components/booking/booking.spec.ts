import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Booking } from './booking';

describe('BookingComponent', () => {
  let component: Booking;
  let fixture: ComponentFixture<Booking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Booking ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Booking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
