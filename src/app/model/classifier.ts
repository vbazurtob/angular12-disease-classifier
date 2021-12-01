import {InputData} from "./input-data";

export interface Classifier{
    classify(inputData: InputData): string;
}
