import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhEmployesComponent } from './rh-employes.component';

describe('RhEmployesComponent', () => {
  let component: RhEmployesComponent;
  let fixture: ComponentFixture<RhEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RhEmployesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RhEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
