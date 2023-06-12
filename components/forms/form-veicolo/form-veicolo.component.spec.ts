import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVeicoloComponent } from './form-veicolo.component';

describe('FormVeicoloComponent', () => {
  let component: FormVeicoloComponent;
  let fixture: ComponentFixture<FormVeicoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVeicoloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVeicoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
