import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRndComponent } from './register-rnd.component';

describe('RegisterRndComponent', () => {
  let component: RegisterRndComponent;
  let fixture: ComponentFixture<RegisterRndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterRndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
