import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCongeInfoComponent } from './edit-conge-info.component';

describe('EditCongeInfoComponent', () => {
  let component: EditCongeInfoComponent;
  let fixture: ComponentFixture<EditCongeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCongeInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCongeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
