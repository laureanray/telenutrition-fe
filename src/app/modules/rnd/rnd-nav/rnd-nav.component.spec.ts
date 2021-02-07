import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RndNavComponent } from './rnd-nav.component';

describe('RndNavComponent', () => {
  let component: RndNavComponent;
  let fixture: ComponentFixture<RndNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RndNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RndNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
