import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DInvoicesComponent } from './d-invoices.component';

describe('DInvoicesComponent', () => {
  let component: DInvoicesComponent;
  let fixture: ComponentFixture<DInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
