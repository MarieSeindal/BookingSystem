import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserComponent } from './select-user.component';

describe('SelectUserComponent', () => {
  let component: SelectUserComponent;
  let fixture: ComponentFixture<SelectUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SelectUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
