import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BloodPressureInputParser} from "../service/BloodPressureInputParser";
import {BloodPressureDataModel} from "../model/blood-pressure-data.model";
import {Classifier} from "../service/Classifier";

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

  constructor(private inputParser: BloodPressureInputParser, private classifier: Classifier) {
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
    return this.classifier.classifyBloodPressure(this.lastReading);
  }
}
