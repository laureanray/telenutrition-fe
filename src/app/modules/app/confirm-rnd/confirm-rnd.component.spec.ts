import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRndComponent } from './confirm-rnd.component';

describe('ConfirmRndComponent', () => {
  let component: ConfirmRndComponent;
  let fixture: ComponentFixture<ConfirmRndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
