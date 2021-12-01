import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidneyDiseaseCalculatorComponent } from './kidney-disease-calculator.component';
import {EgfrInputParserService} from "../service/egfr-input-parser.service";
import {EgfrDataClassifierService} from "../service/egfr-data-classifier.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('KidneyDiseaseCalculatorComponent', () => {
  let component: KidneyDiseaseCalculatorComponent;
  let fixture: ComponentFixture<KidneyDiseaseCalculatorComponent>;
  let mockInputParser = jasmine.createSpyObj(['parse']);
  let mockClassifierService = jasmine.createSpyObj(['classify']);
  mockInputParser.parse = (input:string) =>[{eGFR: 65, atDate: '2012/10/31'}];
  mockInputParser.classify = (arrInput: any[]) =>'TEST';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidneyDiseaseCalculatorComponent ],
      providers:[
        {provide: EgfrInputParserService, useValue: mockInputParser} ,
        {provide: EgfrDataClassifierService, useValue: mockClassifierService}
      ],
      imports: [RouterTestingModule]
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
