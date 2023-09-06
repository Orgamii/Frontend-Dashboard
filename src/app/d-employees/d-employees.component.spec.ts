import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DEmployeesComponent } from './d-employees.component';

describe('DEmployeesComponent', () => {
  let component: DEmployeesComponent;
  let fixture: ComponentFixture<DEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
