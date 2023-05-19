import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonPageComponent } from './add-person-page.component';

describe('AddPersonPageComponent', () => {
  let component: AddPersonPageComponent;
  let fixture: ComponentFixture<AddPersonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddPersonPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
