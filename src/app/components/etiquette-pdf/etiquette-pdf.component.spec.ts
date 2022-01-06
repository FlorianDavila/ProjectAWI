import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquettePdfComponent } from './etiquette-pdf.component';

describe('EtiquettePdfComponent', () => {
  let component: EtiquettePdfComponent;
  let fixture: ComponentFixture<EtiquettePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtiquettePdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquettePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
