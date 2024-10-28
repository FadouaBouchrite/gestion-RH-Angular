import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhAbsencesComponent } from './rh-absences.component';

describe('RhAbsencesComponent', () => {
  let component: RhAbsencesComponent;
  let fixture: ComponentFixture<RhAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RhAbsencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RhAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
