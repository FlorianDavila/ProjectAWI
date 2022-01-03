import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichePDFComponent } from './fiche-pdf.component';

describe('FichePDFComponent', () => {
  let component: FichePDFComponent;
  let fixture: ComponentFixture<FichePDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichePDFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichePDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
