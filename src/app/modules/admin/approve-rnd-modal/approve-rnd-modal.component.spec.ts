import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRndModalComponent } from './approve-rnd-modal.component';

describe('ApproveRndModalComponent', () => {
  let component: ApproveRndModalComponent;
  let fixture: ComponentFixture<ApproveRndModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveRndModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRndModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
