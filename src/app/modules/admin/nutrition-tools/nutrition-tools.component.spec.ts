import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionToolsComponent } from './nutrition-tools.component';

describe('NutritionToolsComponent', () => {
  let component: NutritionToolsComponent;
  let fixture: ComponentFixture<NutritionToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
