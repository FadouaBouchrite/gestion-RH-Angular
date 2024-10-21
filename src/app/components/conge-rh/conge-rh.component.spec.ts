import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeRhComponent } from './conge-rh.component';

describe('CongeRhComponent', () => {
  let component: CongeRhComponent;
  let fixture: ComponentFixture<CongeRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CongeRhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongeRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
