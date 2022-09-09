import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierUpdateComponent } from './infirmier-update.component';

describe('InfirmierUpdateComponent', () => {
  let component: InfirmierUpdateComponent;
  let fixture: ComponentFixture<InfirmierUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfirmierUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfirmierUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
