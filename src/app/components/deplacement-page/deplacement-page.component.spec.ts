import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeplacementPageComponent } from './deplacement-page.component';

describe('DeplacementPageComponent', () => {
  let component: DeplacementPageComponent;
  let fixture: ComponentFixture<DeplacementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeplacementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeplacementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
