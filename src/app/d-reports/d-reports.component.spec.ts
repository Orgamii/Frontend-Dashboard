import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DReportsComponent } from './d-reports.component';

describe('DReportsComponent', () => {
  let component: DReportsComponent;
  let fixture: ComponentFixture<DReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
