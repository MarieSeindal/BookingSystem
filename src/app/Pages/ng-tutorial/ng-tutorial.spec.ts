import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTutorial } from "./ng-tutorial";

describe('NgTutorialComponent', () => {
  let component: NgTutorial;
  let fixture: ComponentFixture<NgTutorial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgTutorial ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NgTutorial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
