import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericFormPatientComponent } from './generic-form-patient.component';

describe('GenericFormPatientComponent', () => {
  let component: GenericFormPatientComponent;
  let fixture: ComponentFixture<GenericFormPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericFormPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericFormPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
