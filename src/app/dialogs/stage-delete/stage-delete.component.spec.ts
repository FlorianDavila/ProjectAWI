import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageDeleteComponent } from './stage-delete.component';

describe('StageDeleteComponent', () => {
  let component: StageDeleteComponent;
  let fixture: ComponentFixture<StageDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StageDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StageDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
