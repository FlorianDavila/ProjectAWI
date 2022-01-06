import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmVenteComponent } from './confirm-vente.component';

describe('ConfirmVenteComponent', () => {
  let component: ConfirmVenteComponent;
  let fixture: ComponentFixture<ConfirmVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmVenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
