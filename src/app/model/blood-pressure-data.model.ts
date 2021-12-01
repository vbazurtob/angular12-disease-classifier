import {InputData} from "./input-data";

export interface BloodPressureDataModel extends InputData{
    SysBP: number,
    DiaBP: number,
}
