import {InputParser} from "../model/input-parser";
import {
    arraysHaveSameSize,
    inputContainsValidReadingObjects,
    isInputStrArray, quoteSubstringInText,
    removeSquareBrackets, replaceSingleQuotesForDoubles, rewriteExceptionMsg,
    splitReadingObjectsStr, validateDateFormat
} from "../util/utils";

export class BloodPressureInputParserService implements  InputParser {

    readonly jsonObjRegexp = /\{{1}\s*SysBP:\s*\d+\s*\,\s*DiaBP:\s*\d+\s*\,\s*atDate:\s*\'\d{4}\/\d{2}\/\d{2}\'\s*\}{1}\,{0,1}/g;
    readonly regexpObj = new RegExp(this.jsonObjRegexp, 'g');
    readonly  correctObjFormat = '{SysBP: 0, DiaBP: 0, atDate: \'yyyy\/mm\/dd\'\}';

    parse(inputData: string): any {
        let sanitizedInputData = inputData.trim();
        if(isInputStrArray(sanitizedInputData)){
            return {error: 'Input data is not formatted as a valid array of readings'};
        }

        if(inputContainsValidReadingObjects(sanitizedInputData, this.jsonObjRegexp)){
            return {error: `The content of the array is not well formatted. Double check every reading is` +
                    `formatted as ${this.correctObjFormat}`};
        }

        // Remove squared brackets and leave only list of objects
        sanitizedInputData = removeSquareBrackets(sanitizedInputData);
        if(!(sanitizedInputData).match(this.regexpObj)){
            return {error: 'The content of the array is not well formatted. Double check every reading is' +
                    `formatted as ${this.correctObjFormat}`};
        }

        const splittedInputObjStr = splitReadingObjectsStr(sanitizedInputData);
        const valuesRegexp = /SysBP:\s*(\w+),\s*DiaBP:\s*(\w+),\s*atDate:\s*'(\w{4})\/(\w{2})\/(\w{2})'/g;
        let errorMsg = '';
        const tmpArrResults:any[] = [];

        try {
            for (let str of splittedInputObjStr) {
                let matches = [...str.matchAll(valuesRegexp)];
                let m = matches !== undefined ? matches[0] : undefined;

                if (m !== undefined) {
                    let sysBpStr = m[1];
                    let diaBpStr = m[2];
                    let yyyy = m[3];
                    let mm = m[4];
                    let dd = m[5];

                    const sysBp = parseInt(sysBpStr);
                    if (sysBp <= 0 || sysBp > 999) {
                        errorMsg = `Invalid SysBP value: ${sysBp}. SysBP values should be between 1 and 999. Range exceeded`;
                        break;
                    }

                    const diaBp = parseInt(diaBpStr);
                    if (diaBp <= 0 || diaBp > 999) {
                        errorMsg = `Invalid DiaBP value: ${diaBp}. DiaBP values should be between 1 and 999. Range exceeded`;
                        break;
                    }

                    const dateErrMsg = validateDateFormat(yyyy, mm, dd);
                    if(dateErrMsg !== ''){
                        errorMsg = dateErrMsg;
                        break;
                    }

                    str = quoteSubstringInText(str, 'SysBP');
                    str = quoteSubstringInText(str, 'DiaBP');
                    str = quoteSubstringInText(str, 'atDate');
                    str = replaceSingleQuotesForDoubles(str);
                    const fullDate = Date.parse(`${yyyy}-${mm}-${dd}`);
                    const tmpJson = JSON.parse(str);
                    tmpJson.atDate = fullDate;
                    tmpArrResults.push(tmpJson);
                } else {
                    // Unmatched entries
                    errorMsg = `Couldn\'t parse entry ${str}. Double-check format: SysBP and DiaBP 
                    only accepts integer numbers 
                    and atDate dates in the yyyy/mm/dd format`;
                    break;
                }
            }

        } catch (e) {
            errorMsg = rewriteExceptionMsg(e + '');
            if (errorMsg.match(/JSON at position/g)){
                errorMsg = 'Some Object contains invalid format. Proper structure of input objects are in the form: ' +
                    '\{egGFR: 0, atDate: \yyyy\/mm\/dd\'\}\'';
            }
        }

        if(errorMsg===''){
            errorMsg = arraysHaveSameSize(tmpArrResults, splittedInputObjStr) ? 'Not all input ' +
                'objects could be parsed. Double-check for format errors' : '';
        }

        if(errorMsg !== ''){
            return {error: errorMsg};
        }

        return tmpArrResults;
    }
}
