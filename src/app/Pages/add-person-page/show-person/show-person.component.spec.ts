import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPersonComponent } from './show-person.component';

describe('ShowPersonComponent', () => {
  let component: ShowPersonComponent;
  let fixture: ComponentFixture<ShowPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ShowPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
