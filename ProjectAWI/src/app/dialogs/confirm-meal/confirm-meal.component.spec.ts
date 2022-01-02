import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMealComponent } from './confirm-meal.component';

describe('ConfirmMealComponent', () => {
  let component: ConfirmMealComponent;
  let fixture: ComponentFixture<ConfirmMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmMealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
