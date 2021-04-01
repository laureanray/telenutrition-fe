import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAmountModalComponent } from './update-amount-modal.component';

describe('UpdateAmountModalComponent', () => {
  let component: UpdateAmountModalComponent;
  let fixture: ComponentFixture<UpdateAmountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAmountModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAmountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
