import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericFieldsetInfirmierComponent } from './generic-fieldset-infirmier.component';

describe('GenericFieldsetInfirmierComponent', () => {
  let component: GenericFieldsetInfirmierComponent;
  let fixture: ComponentFixture<GenericFieldsetInfirmierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericFieldsetInfirmierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericFieldsetInfirmierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
