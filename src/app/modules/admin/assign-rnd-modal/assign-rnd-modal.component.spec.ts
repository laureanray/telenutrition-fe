import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRndModalComponent } from './assign-rnd-modal.component';

describe('AssignRndModalComponent', () => {
  let component: AssignRndModalComponent;
  let fixture: ComponentFixture<AssignRndModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRndModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRndModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
