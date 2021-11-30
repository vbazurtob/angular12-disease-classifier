import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidneyDiseaseCalculatorComponent } from './kidney-disease-calculator.component';

describe('KidneyDiseaseCalculatorComponent', () => {
  let component: KidneyDiseaseCalculatorComponent;
  let fixture: ComponentFixture<KidneyDiseaseCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidneyDiseaseCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KidneyDiseaseCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
