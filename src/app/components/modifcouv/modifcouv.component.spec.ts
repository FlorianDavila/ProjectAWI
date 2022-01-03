import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifcouvComponent } from './modifcouv.component';

describe('ModifcouvComponent', () => {
  let component: ModifcouvComponent;
  let fixture: ComponentFixture<ModifcouvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifcouvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifcouvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
