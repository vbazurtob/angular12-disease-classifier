import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EgfrInputParserService} from "../service/egfr-input-parser.service";
import {EgfrDataClassifierService} from "../service/egfr-data-classifier.service";
import {EgfrDataModel} from "../model/egfr-data.model";

@Component({
  selector: 'app-kidney-disease-calculator',
  templateUrl: './kidney-disease-calculator.component.html',
  styleUrls: ['./kidney-disease-calculator.component.scss']
})
export class KidneyDiseaseCalculatorComponent implements OnInit {

  @ViewChild('inputTextData') inputTextData!: ElementRef<HTMLTextAreaElement>;

  lastReading: EgfrDataModel = {
    eGFR: 0,
    atDate: -1
  };
  drops: any[] = []
  displayedColumns = ['previous_e', 'previous_d', 'next_e', 'next_d', 'drop']
  errorMessage = '';

  constructor(private inputParser: EgfrInputParserService, private classifier: EgfrDataClassifierService) {
  }

  ngOnInit(): void {
  }

  parseData(){
    this.errorMessage = '';
    const inputData = this.inputTextData.nativeElement.value;
    const result = this.inputParser.parse(inputData.trim());
    console.log('RESULT');
    console.log(result);

    if(result['error']){
      console.log(result.error);
      this.errorMessage = result.error;
      return;
    }

    function compare (a: EgfrDataModel, b: EgfrDataModel) { return a.atDate - b.atDate ; }

    result.sort(compare);
    console.log(result);

    const consecutiveArr: any = [];
    result.reduce((prev: any, curr: any) => {

      console.log(prev);
      console.log(curr);
      console.log('---');

      if(prev.eGFR != 0) {
        let dropPercentage = ((prev.eGFR - curr.eGFR) / prev.eGFR) ;
        // if(prev.eGFR  >=  (curr.eGFR * 0.2)){
        console.log(dropPercentage);
        if (dropPercentage >= 0.2) {

          consecutiveArr.push(
              {
                previous: prev,
                current: curr,
                drop: dropPercentage
              }
          );
        }
      }
      return curr;
    });

    console.log('DROPS');
    console.log(consecutiveArr);

    this.lastReading = result[result.length - 1];
    this.drops = consecutiveArr;

  }

  classifyReading(){
    if(this.lastReading.atDate < 0 ){
      return '';
    }
    return this.classifier.classify(this.lastReading);
  }

}
