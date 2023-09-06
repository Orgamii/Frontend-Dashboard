import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPatientsComponent } from './d-patients.component';

describe('DPatientsComponent', () => {
  let component: DPatientsComponent;
  let fixture: ComponentFixture<DPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
