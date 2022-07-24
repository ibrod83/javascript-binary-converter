
export function decimalToBinary(decimal: number) {
    return (decimal >>> 0).toString(2);

}

export function binaryToDecimal(binary: string, isSigned: boolean = false) {

    if (binary.length > 32) throw new Error('binaryToDecimal does not support bigint')

    return isSigned ? getSignedInteger(binary) : parseInt(binary, 2);

}

function getSignedInteger(bits: string) {

    const negative = (bits[0] === '1');
    if (negative) {
        let inverse = '';
        for (let i = 0; i < bits.length; i++) {
            inverse += (bits[i] === '0' ? '1' : '0');
        }
        return (parseInt(inverse, 2) + 1) * -1;
    } else {
        return parseInt(bits, 2);
    }
}


export function appendZeros(binary: string) {

    let fullString = binary
    const numOfZerosMissing = 8 - binary.length
    for (let i = 0; i < numOfZerosMissing; i++) {
        fullString = "0" + fullString
    }
    return fullString
}

export function uint8ToBytes(uint8: Uint8Array) {
    const bytes: Array<string> = []
    for (let decimal of uint8) {
        bytes.push(appendZeros(decimalToBinary(decimal)))
    }
    return bytes
}
    //      var bytes = ['11101111', '10111111', '00000001', '00000000']

export function groupBytes(bytes: Array<string>, groupSize: number) {
    // debugger;
    // const indexToStop = bytes.length - (groupSize-1);
    const normalizedArray: Array<string> = []
    let currentBitString = ""
    for (let i = 1; i <= bytes.length; i++) {
        currentBitString+=bytes[i-1]
        if(i % groupSize=== 0){
            normalizedArray.push(currentBitString)
            currentBitString=""
        }
        
        
    }
    // debugger
    return normalizedArray
    // var match =  
    // return bytes.join("").match(/.{1,16}/g)
}