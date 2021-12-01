import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BloodPressureInputParserService} from "../service/blood-pressure-input-parser.service";
import {BloodPressureDataModel} from "../model/blood-pressure-data.model";
import {BloodPressureClassifierService} from "../service/blood-pressure-classifier.service";

@Component({
  selector: 'app-hypertension-calculator',
  templateUrl: './hypertension-calculator.component.html',
  styleUrls: ['./hypertension-calculator.component.scss']
})
export class HypertensionCalculatorComponent {

  @ViewChild('inputTextData') inputTextData!: ElementRef<HTMLTextAreaElement>;

  readonly  initialValue = {
    SysBP: 0,
    DiaBP: 0,
    atDate: -1
  };
  lastReading: BloodPressureDataModel = this.initialValue;
  errorMessage = '';

  constructor(private inputParser: BloodPressureInputParserService,
              private classifier: BloodPressureClassifierService) {}

  parseData() {
    this.errorMessage = '';
    this.lastReading = this.initialValue;
    const inputData = this.inputTextData.nativeElement.value;
    const result = this.inputParser.parse(inputData.trim());
    if(result['error']){
      this.errorMessage = result.error;
      return;
    }

    result.sort(this.compareBPObjects);
    this.lastReading = result[result.length-1];
  }

  compareBPObjects(a: BloodPressureDataModel, b: BloodPressureDataModel) { return a.atDate - b.atDate ; }

  classifyReading(){
    if(this.lastReading.DiaBP == 0 || this.lastReading.DiaBP == 0){
      return '';
    }
    return this.classifier.classify(this.lastReading);
  }
}
