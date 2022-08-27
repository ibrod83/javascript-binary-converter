export function padString(string: string, requiredLength = 8, paddingCharacter = "0") {

    let fullString = string
    const numOfZerosMissing = requiredLength - string.length
    for (let i = 0; i < numOfZerosMissing; i++) {
        fullString = paddingCharacter + fullString
    }
    return fullString
}

export function trimString(string: string, requiredLength = 8) {

    return string.slice(string.length - requiredLength);
}

export function reverseString(s: string) {
    return s.split("").reverse().join("");
}

export function isNumericString(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n) && typeof n === 'string';
}

export function splitStringToChunks(string: string, chunkSize: number) {
    return string.match(new RegExp('.{1,' + chunkSize + '}', 'g')) as Array<string>;
}

export function stringToBinary(text:string) {
    const encoder = new TextEncoder()
    const typedArray = encoder.encode(text)
    let binary=""
    for(let integer of typedArray){
        binary+=padString(integer.toString(2))
    }
    return binary

}
