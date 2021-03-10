import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRndComponent } from './view-rnd.component';

describe('ViewRndComponent', () => {
  let component: ViewRndComponent;
  let fixture: ComponentFixture<ViewRndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
