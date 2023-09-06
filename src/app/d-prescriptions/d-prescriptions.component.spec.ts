import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPrescriptionsComponent } from './d-prescriptions.component';

describe('DPrescriptionsComponent', () => {
  let component: DPrescriptionsComponent;
  let fixture: ComponentFixture<DPrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DPrescriptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
