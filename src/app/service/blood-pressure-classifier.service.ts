import {BloodPressureDataModel} from "../model/blood-pressure-data.model";
import {EgfrDataModel} from "../model/egfr-data.model";
import {Classifier} from "../model/classifier";

export class BloodPressureClassifierService implements Classifier{
    classify(bpData: BloodPressureDataModel){
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
}
