export function validateDateFormat(yyyy: string, mm: string, dd: string) {
    const year = parseInt(yyyy);
    console.log(year);
    if (isNaN(year) || !Number.isInteger(year) || (year < 1000 || year > 9999)) {
        return 'Some dates have format error in the year. Check format. Should be yyyy';
    }

    const month = parseInt(mm);
    if (isNaN(month) || (month < 1 || month > 12)) {
        return 'Some dates have format error in the month. Check format. Should be mm';
    }

    const day = parseInt(dd);
    if (isNaN(day) || (day < 1 || day > 31)) {
        return 'Some dates have format error in the day. Check format. Should be dd';
    }

    const fullDate = Date.parse(`${yyyy}-${mm}-${dd}`);
    if (isNaN(fullDate)) {
        return 'Some couldn\'t been parsed. Some numbers might be out or range or not a valid date';
    }

    return '';
}

export function quoteSubstringInText(text: string, substring: string){
    const regexp = new RegExp(substring, 'g');
    text = text.replace(regexp, `"${substring}"`);
    return text;
}

export function replaceSingleQuotesForDoubles(str: string): string {
    return str.replace(/\'/g, '"');
}


export function rewriteExceptionMsg(eMsg: string){

    if( eMsg.match(/SyntaxError: Unexpected token , in JSON/g) ){
        return 'Check the input format. A comma(,) might be added at the end of one } ' +
            'without specifying another full reading object such as {...}. Please remove the comma';
    } else if (eMsg.match(/Unexpected token \{ in/g)){
        return 'Check the input format. A curly bracket({ or }) might be added in the wrong place. A proper ' +
            'reading object should have a beginning and ending curly bracket. e.g. { ... }';
    }



    return eMsg;
}

export function arraysHaveSameSize(arr1: any[], arr2: any[]){
    return arr1.length < arr2.length;
}

export function splitReadingObjectsStr(text: string){
    let sanitizedInputData = text.trim();
    const separator = 'xSEPARATORx';
    sanitizedInputData = sanitizedInputData.replace(/\}\s*,\s*\{/g, `}${separator}{`);
    return sanitizedInputData.split(new RegExp(separator, 'g'));
}

export function isInputStrArray(input: string){
    const jsonArrRegexp = /^\[\s*(\{\s*[\d\D\s*]*\s*\}{1}\,{0,1})+\s*\]$/g
    const regexpArrObj = new RegExp(jsonArrRegexp, 'g');
    const arrayMatched = input.trim().match(regexpArrObj);
    return arrayMatched === null || arrayMatched === undefined || arrayMatched[0] === null;
}

export function inputContainsValidReadingObjects(inputData: string, regexpObj: RegExp){
    const matchedArrObj = regexpObj.exec(inputData);
    return matchedArrObj === null || matchedArrObj === undefined || matchedArrObj[0] === null;
}

export function removeSquareBrackets(input: string){
    return input.replace(/[\[ | \]]/g, '');
}
