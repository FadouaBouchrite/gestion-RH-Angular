import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplAbsenceComponent } from './empl-absence.component';

describe('EmplAbsenceComponent', () => {
  let component: EmplAbsenceComponent;
  let fixture: ComponentFixture<EmplAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmplAbsenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmplAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
