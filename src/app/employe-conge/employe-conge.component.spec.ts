import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeCongeComponent } from './employe-conge.component';

describe('EmployeCongeComponent', () => {
  let component: EmployeCongeComponent;
  let fixture: ComponentFixture<EmployeCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeCongeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
