import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HypertensionCalculatorComponent } from './hypertension-calculator.component';
import {BloodPressureInputParserService} from "../service/blood-pressure-input-parser.service";
import {BloodPressureClassifierService} from "../service/blood-pressure-classifier.service";
import {AppComponent} from "../app.component";

describe('HypertensionCalculatorComponent', () => {
  let component: HypertensionCalculatorComponent;
  let fixture: ComponentFixture<HypertensionCalculatorComponent>;

  let mockInputParser = jasmine.createSpyObj(['parse']);
  let mockClassifierService = jasmine.createSpyObj(['classify']);
  mockInputParser.parse = (input:string) =>[{SysBp: 11, DiaBP: 11, atDate: '2021/01/01'}];
  mockInputParser.classify = (arrInput: any[]) =>'TEST'


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HypertensionCalculatorComponent ],
      providers: [
        {provide: BloodPressureInputParserService, useValue: mockInputParser},
        {provide: BloodPressureClassifierService, useValue: mockClassifierService}
      ],
      imports: [RouterTestingModule]
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
