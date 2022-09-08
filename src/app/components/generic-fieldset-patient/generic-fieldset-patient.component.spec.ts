import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericFieldsetPatientComponent } from './generic-fieldset-patient.component';

describe('GenericFieldsetPatientComponent', () => {
  let component: GenericFieldsetPatientComponent;
  let fixture: ComponentFixture<GenericFieldsetPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericFieldsetPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericFieldsetPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
