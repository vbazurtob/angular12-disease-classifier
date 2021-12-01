import {InputParser} from "../model/input-parser";
import {
    arraysHaveSameSize, inputContainsValidReadingObjects, isInputStrArray,
    quoteSubstringInText, removeSquareBrackets,
    replaceSingleQuotesForDoubles,
    rewriteExceptionMsg, splitReadingObjectsStr,
    validateDateFormat
} from "../util/utils";

export class EgfrInputParserService implements InputParser{
    readonly jsonObjRegexp = /\{{1}\s*eGFR:\s*\d+\s*\,\s*atDate:\s*\'\d{4}\/\d{2}\/\d{2}\'\s*\}{1}\,{0,1}/g;
    readonly regexpObj = new RegExp(this.jsonObjRegexp, 'g');

    parse(inputData: string): any {
        let sanitizedInputData = inputData.trim();
        if(isInputStrArray(sanitizedInputData)){
            return {error: 'Input data is not formatted as a valid array of readings'};
        }

        if(inputContainsValidReadingObjects(sanitizedInputData, this.jsonObjRegexp)){
            return {error: 'The content of the array is not well formatted. Double check every reading is' +
                    'formatted as \{egGFR: 0, atDate: \'yyyy\/mm\/dd\'\}'};
        }

        // Remove squared brackets and leave only list of objects
        sanitizedInputData = removeSquareBrackets(sanitizedInputData);
        if(!(sanitizedInputData).match(this.regexpObj)){
            return {error: 'The content of the array is not well formatted. Double check every reading is' +
                    'formatted as \{egGFR: 0, atDate: \'yyyy\/mm\/dd\'\}'};
        }

        const splittedInputObjStr = splitReadingObjectsStr(sanitizedInputData);
        const valuesRegexp = /eGFR:\s*(\w+),\s*atDate:\s*'(\w{4})\/(\w{2})\/(\w{2})'/g;
        let errorMsg = '';
        const tmpArrResults:any[] = [];

        try {
            for (let str of splittedInputObjStr) {

                let matches = [...str.matchAll(valuesRegexp)];
                let m = matches !== undefined ? matches[0] : undefined;

                if (m !== undefined) {
                    let egfrStr = m[1];
                    let yyyy = m[2];
                    let mm = m[3];
                    let dd = m[4];

                    const egfr = parseInt(egfrStr);
                    if (egfr <= 0 || egfr > 999) {
                        errorMsg = `Invalid eGFR value: ${egfr}. eGFR values should be between 1 and 999. Range exceeded`;
                        break;
                    }
                    const dateErrMsg = validateDateFormat(yyyy, mm, dd);
                    if(dateErrMsg !== ''){
                        errorMsg = dateErrMsg;
                        break;
                    }

                    str = quoteSubstringInText(str, 'eGFR');
                    str = quoteSubstringInText(str, 'atDate');
                    str = replaceSingleQuotesForDoubles(str);

                    const tmpJson = JSON.parse(str);
                    const fullDate = Date.parse(`${yyyy}-${mm}-${dd}`);
                    tmpJson.atDate = fullDate;
                    tmpArrResults.push(tmpJson);
                } else {
                    // Unmatched entries
                    errorMsg = `Couldn\'t parse entry ${str}. Double-check format: eGFR only accepts integer numbers 
                    and atDate dates in the yyyy/mm/dd format`;
                    break;
                }
            }
        } catch (e) {
            errorMsg = rewriteExceptionMsg(e + '');

            // Rewrite for specific type
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
