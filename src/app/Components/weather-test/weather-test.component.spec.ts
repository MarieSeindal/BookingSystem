import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTestComponent } from './weather-test.component';

describe('WeatherTestComponent', () => {
  let component: WeatherTestComponent;
  let fixture: ComponentFixture<WeatherTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
