import {Component, ElementRef, ViewChild} from '@angular/core';
import {EgfrInputParserService} from "../service/egfr-input-parser.service";
import {EgfrDataClassifierService} from "../service/egfr-data-classifier.service";
import {EgfrDataModel} from "../model/egfr-data.model";

@Component({
  selector: 'app-kidney-disease-calculator',
  templateUrl: './kidney-disease-calculator.component.html',
  styleUrls: ['./kidney-disease-calculator.component.scss']
})
export class KidneyDiseaseCalculatorComponent  {

  @ViewChild('inputTextData') inputTextData!: ElementRef<HTMLTextAreaElement>;
  initialValue: EgfrDataModel = {
    eGFR: 0,
    atDate: -1
  };
  lastReading: EgfrDataModel = this.initialValue;
  drops: any[] = []
  displayedColumns = ['previous_e', 'previous_d', 'next_e', 'next_d', 'drop']
  errorMessage = '';

  constructor(private inputParser: EgfrInputParserService, private classifier: EgfrDataClassifierService) {
  }


  parseData(){
    this.errorMessage = '';
    this.lastReading = this.initialValue;
    const inputData = this.inputTextData.nativeElement.value;
    const parsedEntries = this.inputParser.parse(inputData.trim());

    if(parsedEntries['error']){
      this.errorMessage = parsedEntries.error;
      return;
    }

    parsedEntries.sort(this.compareEgfrEntries);

    this.lastReading = parsedEntries[parsedEntries.length - 1];
    this.drops = this.computeDrops(parsedEntries);
  }

  compareEgfrEntries(a: EgfrDataModel, b: EgfrDataModel) { return a.atDate - b.atDate ; }

  classifyReading(){
    if(this.lastReading.atDate < 0 ){
      return '';
    }
    return this.classifier.classify(this.lastReading);
  }

  private computeDrops(arrResults: any[]){
    const arrDrops: any = [];
    arrResults.reduce((prev: any, curr: any) => {
      if(prev.eGFR != 0) {
        let dropPercentage = ((prev.eGFR - curr.eGFR) / prev.eGFR) ;
        if (dropPercentage >= 0.2) {
          arrDrops.push(
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
    return arrDrops;
  }

}
