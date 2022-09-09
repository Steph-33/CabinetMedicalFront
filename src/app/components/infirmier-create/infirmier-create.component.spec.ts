import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierCreateComponent } from './infirmier-create.component';

describe('InfirmierCreateComponent', () => {
  let component: InfirmierCreateComponent;
  let fixture: ComponentFixture<InfirmierCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfirmierCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmierCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
