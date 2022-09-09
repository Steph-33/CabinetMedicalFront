import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeplacementPageComponent } from './add-deplacement-page.component';

describe('AddDeplacementPageComponent', () => {
  let component: AddDeplacementPageComponent;
  let fixture: ComponentFixture<AddDeplacementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeplacementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeplacementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
