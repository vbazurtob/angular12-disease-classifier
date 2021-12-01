import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BloodPressureInputParserService} from "../service/blood-pressure-input-parser.service";
import {BloodPressureDataModel} from "../model/blood-pressure-data.model";
import {BloodPressureClassifierService} from "../service/blood-pressure-classifier.service";

@Component({
  selector: 'app-hypertension-calculator',
  templateUrl: './hypertension-calculator.component.html',
  styleUrls: ['./hypertension-calculator.component.scss']
})
export class HypertensionCalculatorComponent implements OnInit {

  @ViewChild('inputTextData') inputTextData!: ElementRef<HTMLTextAreaElement>;

  lastReading: BloodPressureDataModel = {
    SysBP: 0,
    DiaBP: 0,
    atDate: 0
  };

  constructor(private inputParser: BloodPressureInputParserService, private classifier: BloodPressureClassifierService) {
  }

  ngOnInit(): void {
  }

  parseData(evt: any) {
    const inputData = this.inputTextData.nativeElement.value;

    console.log(inputData.trim());

    const result = this.inputParser.parse(inputData.trim());
    console.log('RESULT');
    console.log(result);
    if(result['error']){
      console.log(result.error);
      return;
    }

    function compare (a: BloodPressureDataModel, b: BloodPressureDataModel) { return a.atDate - b.atDate ; }

    result.sort(compare);
    console.log(result);
    this.lastReading = result.pop();
  }

  classifyReading(){
    if(this.lastReading.DiaBP == 0 || this.lastReading.DiaBP == 0){
      return '';
    }
    return this.classifier.classify(this.lastReading);
  }
}
