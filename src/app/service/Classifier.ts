import {BloodPressureDataModel} from "../model/blood-pressure-data.model";
import {EgfrDataModel} from "../model/egfr-data.model";

export class Classifier {
    classifyBloodPressure(bpData: BloodPressureDataModel){
        if(bpData.SysBP >= 180 && bpData.DiaBP >= 120){
            return 'Stage 3';
        } else if((bpData.SysBP >= 160 && bpData.SysBP < 180)
            || (bpData.DiaBP >= 100 &&  bpData.DiaBP < 110)){
            return 'Stage 2';
        } else if((bpData.SysBP >= 140 && bpData.SysBP < 160)
            || (bpData.DiaBP >= 90 &&  bpData.DiaBP < 100)) {
            return 'Stage 1';
        } else {
            return 'No Hypertension';
        }
    }


    classifyEgfr(egfrData: EgfrDataModel){
        if(egfrData.eGFR >= 90){
            return 'Normal';
        } else if((egfrData.eGFR >= 60 && egfrData.eGFR >= 89)){
            return 'Mildly Decreased';
        } else if((egfrData.eGFR >= 45 && egfrData.eGFR >= 59)){
            return 'Mild to Moderate';
        } else if((egfrData.eGFR >= 30 && egfrData.eGFR >= 44)){
            return 'Moderate to Severe';
        } else if((egfrData.eGFR >= 15 && egfrData.eGFR >= 29)){
            return 'Severely Decreased';
        } else {
            return 'Kidney Failure';
        }
    }

}
