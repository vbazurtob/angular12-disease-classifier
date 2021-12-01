import {InputParser} from "../model/input-parser";
import {
    arraysHaveSameSize, inputContainsValidReadingObjects, isInputStrArray,
    quoteSubstringInText, removeSquareBrackets,
    replaceSingleQuotesForDoubles,
    rewriteExceptionMsg, splitReadingObjectsStr,
    validateDateFormat
} from "../util/utils";

export class EgfrInputParserService implements InputParser{

    // readonly strictArrayCheck = /^\[[\d|\D|\s*]*\]{1}$/g
// ^[\s*|\[][\d|\D|\s*]*[\]{1}|\s*]$
//     readonly jsonArrRegexp = /^\[\s*(\{\s*[\d\D\s*]*\s*\}{1}\,{0,1})+\s*\]$/g
    readonly jsonObjRegexp = /\{{1}\s*eGFR:\s*\d+\s*\,\s*atDate:\s*\'\d{4}\/\d{2}\/\d{2}\'\s*\}{1}\,{0,1}/g;
    // readonly regexpArrObj = new RegExp(this.jsonArrRegexp, 'g');
    readonly regexpObj = new RegExp(this.jsonObjRegexp, 'g');


    parse(inputData: string): any {
        let sanitizedInputData = inputData.trim();

        // const arrayMatched = inputData.trim().match(this.regexpArrObj);
        // // console.log(arrayMatched);
        // if( arrayMatched === null || arrayMatched === undefined || arrayMatched[0] === null){
        //     // console.log('Is not formatted as array');
        //     return {error: 'Is not formatted as array'};
        // }
        if(isInputStrArray(sanitizedInputData)){
            return {error: 'Input data is not formatted as a valid array of readings'};
        }

        // const matchedArrObj = this.regexpObj.exec(inputData);
        // console.log(inputData);
        // console.log(matchedArrObj);
        //
        //
        // if(matchedArrObj === null || matchedArrObj === undefined || matchedArrObj[0] === null){
        //     // console.log('Content of the array is not well formatted');
        //     return {error: 'Content of the array is not well formatted'};
        // }
        if(inputContainsValidReadingObjects(sanitizedInputData, this.jsonObjRegexp)){
            return {error: 'The content of the array is not well formatted. Double check every reading is' +
                    'formatted as \{egGFR: 0, atDate: \'yyyy\/mm\/dd\'\}'};
        }


        sanitizedInputData = removeSquareBrackets(sanitizedInputData);
            // sanitizedInputData.replace(/[\[ | \]]/g, '');


        // console.log(`No brackets`);
        console.log(sanitizedInputData);


        // let parsedObjects = (sanitizedInputData).match(regexpObj);

        if(!(sanitizedInputData).match(this.regexpObj)){
            // console.log('Content of the array are not well formatted');
            return {error: 'The content of the array is not well formatted. Double check every reading is' +
                    'formatted as \{egGFR: 0, atDate: \'yyyy\/mm\/dd\'\}'};

        }
        let arrData = [];

        // console.log((sanitizedInputData).match(regexpObj));

        // console.log(`dsadasdasdasdasd`);
        // sanitizedInputData = sanitizedInputData.replace(/\}\s*,\s*\{/g, '}xSEPARATORx{');
        // // console.log(sanitizedInputData);
        //
        // //separate
        // const splittedInputObjStr = sanitizedInputData.split(/xSEPARATORx/g);
        const splittedInputObjStr = splitReadingObjectsStr(sanitizedInputData);

        // console.log('splittedInputObjStr');
        // console.log(splittedInputObjStr);

        const valuesRegexp = /eGFR:\s*(\w+),\s*atDate:\s*'(\w{4})\/(\w{2})\/(\w{2})'/g;
        let errorMsg = '';
        const tmpArr:any[] = [];

        try {
            for (let str of splittedInputObjStr) {



                let matches = [...str.matchAll(valuesRegexp)];
                let m = matches !== undefined ? matches[0] : undefined;
                // console.log('m');
                //
                // console.log(m);


                if (m !== undefined) {

                    // console.log(m[0]);
                    // console.log(`sysbp: ${m[1]}`);
                    // console.log(`diabp: ${m[2]}`);
                    // console.log(`yyyy: ${m[3]}`);
                    // console.log(`mm: ${m[4]}`);
                    // console.log(`dd: ${m[5]}`);

                    let egfrStr = m[1];
                    let yyyy = m[2];
                    let mm = m[3];
                    let dd = m[4];

                    const egfr = parseInt(egfrStr);
                    if (egfr <= 0 || egfr > 999) {
                        errorMsg = `Invalid eGFR value: ${egfr}. eGFR values should be between 1 and 999. Range exceeded`;
                        break;
                    }

                    // const year = parseInt(yyyy);
                    // console.log(year);
                    // if (isNaN(year) || !Number.isInteger(year) || (year < 1000 || year > 9999)) {
                    //     // return {error: 'Some dates have format error in the year. Check format. Should be yyyy'};
                    //     errorMsg = 'Some dates have format error in the year. Check format. Should be yyyy';
                    //     break;
                    // }
                    //
                    // const month = parseInt(mm);
                    // if (isNaN(month) || (month < 1 || month > 12)) {
                    //     // return {error: 'Some dates have format error in the month. Check format. Should be mm'};
                    //     errorMsg = 'Some dates have format error in the month. Check format. Should be mm';
                    //     break;
                    // }
                    //
                    // const day = parseInt(dd);
                    // if (isNaN(day) || (day < 1 || day > 31)) {
                    //     // return {error: 'Some dates have format error in the day. Check format. Should be dd'};
                    //     errorMsg = 'Some dates have format error in the day. Check format. Should be dd';
                    //     break;
                    // }
                    //

                    // if (isNaN(fullDate)) {
                    //     // return {error: 'Some couldn\'t been parsed. Some numbers might be out or range or not a valid date'};
                    //     errorMsg = 'Some couldn\'t been parsed. Some numbers might be out or range or not a valid date';
                    //     break;
                    // }
                    const dateErrMsg = validateDateFormat(yyyy, mm, dd);
                    // console.log(dateErrMsg);
                    if(dateErrMsg !== ''){
                        errorMsg = dateErrMsg;
                        break;
                    }

                    // console.log(`str`);

                    // str = str.replace(/eGFR/g, '"eGFR"');
                    // str = str.replace(/atDate/g, '"atDate"');
                    // str = str.replace(/\'/g, '"');

                    str = quoteSubstringInText(str, 'eGFR');
                    str = quoteSubstringInText(str, 'atDate');
                    str = replaceSingleQuotesForDoubles(str);

                    // console.log(str);

                    const tmpJson = JSON.parse(str);
                    const fullDate = Date.parse(`${yyyy}-${mm}-${dd}`);
                    tmpJson.atDate = fullDate;
                    tmpArr.push(tmpJson);
                } else {
                    // Unmatched
                    errorMsg = `Couldn\'t parse entry ${str}. Double-check format: eGFR only accepts integer numbers 
                    and atDate dates in the yyyy/mm/dd format`;
                    break;
                }


            }

        } catch (e) {
            // console.log(e);
            errorMsg = rewriteExceptionMsg(e + '');

            // Rewrite for specific type
            if (errorMsg.match(/JSON at position/g)){
                errorMsg = 'Some Object contains invalid format. Proper structure of input objects are in the form: ' +
                    '\{egGFR: 0, atDate: \yyyy\/mm\/dd\'\}\'';
            }
        }

        // console.log(tmpArr);
        if(errorMsg===''){
            // && tmpArr.length < splittedInputObjStr.length){
            // errorMsg = 'Not all input objects could be parsed. Double-check for format errors';
            errorMsg = arraysHaveSameSize(tmpArr, splittedInputObjStr) ? 'Not all input ' +
                'objects could be parsed. Double-check for format errors' : '';

        }

        if(errorMsg !== ''){
            return {error: errorMsg};
        }
        return tmpArr;

    }

}
