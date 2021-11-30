import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {parse} from "@angular/compiler/src/render3/view/style_parser";
import {BloodPressureDataModel} from "../model/blood-pressure-data.model";
import {BloodPressureInputParser} from "../service/BloodPressureInputParser";

@Component({
  selector: 'app-kidney-disease-calculator',
  templateUrl: './kidney-disease-calculator.component.html',
  styleUrls: ['./kidney-disease-calculator.component.scss']
})
export class KidneyDiseaseCalculatorComponent implements OnInit {

  @ViewChild('inputTextData') inputTextData!: ElementRef<HTMLTextAreaElement>;

  constructor(private svc: BloodPressureInputParser) { }

  ngOnInit(): void {
  }

  parseData(evt: any){
    const inputData = this.inputTextData.nativeElement.value;

    const result = this.svc.parse(inputData.trim());
    console.log('RESULT');
    console.log(result);
  }

}
