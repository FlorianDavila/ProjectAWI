import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionetiqComponent } from './optionetiq.component';

describe('OptionetiqComponent', () => {
  let component: OptionetiqComponent;
  let fixture: ComponentFixture<OptionetiqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionetiqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionetiqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
