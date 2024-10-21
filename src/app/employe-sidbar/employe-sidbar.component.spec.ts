import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeSidbarComponent } from './employe-sidbar.component';

describe('EmployeSidbarComponent', () => {
  let component: EmployeSidbarComponent;
  let fixture: ComponentFixture<EmployeSidbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeSidbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeSidbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
