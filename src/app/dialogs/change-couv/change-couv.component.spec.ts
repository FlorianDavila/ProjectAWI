import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCouvComponent } from './change-couv.component';

describe('ChangeCouvComponent', () => {
  let component: ChangeCouvComponent;
  let fixture: ComponentFixture<ChangeCouvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCouvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCouvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
