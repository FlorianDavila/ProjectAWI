import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptioncoutComponent } from './optioncout.component';

describe('OptcoutComponent', () => {
  let component: OptioncoutComponent;
  let fixture: ComponentFixture<OptioncoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptioncoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptioncoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
