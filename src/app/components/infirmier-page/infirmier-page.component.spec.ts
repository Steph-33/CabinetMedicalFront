import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierPageComponent } from './infirmier-page.component';

describe('InfirmierPageComponent', () => {
  let component: InfirmierPageComponent;
  let fixture: ComponentFixture<InfirmierPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfirmierPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfirmierPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
