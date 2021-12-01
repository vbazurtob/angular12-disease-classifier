import {Classifier} from "../model/classifier";
import {EgfrDataModel} from "../model/egfr-data.model";

export class EgfrDataClassifierService implements Classifier{
    classify(inputData: EgfrDataModel): string {
            if(inputData.eGFR >= 90){
                return 'Normal';
            } else if((inputData.eGFR >= 60 && inputData.eGFR >= 89)){
                return 'Mildly Decreased';
            } else if((inputData.eGFR >= 45 && inputData.eGFR >= 59)){
                return 'Mild to Moderate';
            } else if((inputData.eGFR >= 30 && inputData.eGFR >= 44)){
                return 'Moderate to Severe';
            } else if((inputData.eGFR >= 15 && inputData.eGFR >= 29)){
                return 'Severely Decreased';
            } else {
                return 'Kidney Failure';
            }
    }

}
