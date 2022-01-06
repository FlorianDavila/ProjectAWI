import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaVenteComponent } from './decla-vente.component';

describe('DeclaVenteComponent', () => {
  let component: DeclaVenteComponent;
  let fixture: ComponentFixture<DeclaVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclaVenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclaVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
