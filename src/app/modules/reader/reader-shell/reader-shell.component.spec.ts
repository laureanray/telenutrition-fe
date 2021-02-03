import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReaderShellComponent} from './reader-shell.component';

describe('ReaderShellComponent', () => {
  let component: ReaderShellComponent;
  let fixture: ComponentFixture<ReaderShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReaderShellComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
