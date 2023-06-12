import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloCustomerComponent } from './profilo-customer.component';

describe('ProfiloCustomerComponent', () => {
  let component: ProfiloCustomerComponent;
  let fixture: ComponentFixture<ProfiloCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfiloCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiloCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
