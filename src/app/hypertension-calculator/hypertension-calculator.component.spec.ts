import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HypertensionCalculatorComponent } from './hypertension-calculator.component';

describe('HypertensionCalculatorComponent', () => {
  let component: HypertensionCalculatorComponent;
  let fixture: ComponentFixture<HypertensionCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HypertensionCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HypertensionCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
