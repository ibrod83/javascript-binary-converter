import { TypedArray } from "../sharedTypes";

export function decimalToBinary(decimal: number) {

    const binary =  (decimal >>> 0).toString(2);
    return binary;

}

export function getClosestDividable(divided:number, divisor:number){
    let modulo =divided % divisor;
    while(modulo !== 0){       
        divided++
        modulo =  divided % divisor
    }
    return divided;
}


export function getBytesFromBinary(binaryString:string,{endianness='LITTLE'}:{endianness?:'BIG' | 'LITTLE'}={}){

    if(binaryString.length <= 7) return [appendZeros(binaryString)];

    let closestDividableOfEight = getClosestDividable(binaryString.length,8);
    const binaryStringWithAppendedZeros = appendZeros(binaryString,closestDividableOfEight)
    let bytes = splitBinaryStringToBytes(binaryStringWithAppendedZeros) 
    return endianness === 'LITTLE' ?  bytes.reverse() : bytes;

}


export function binaryToDecimal(binary: string, isSigned: boolean = false) {

    if (binary.length > 32) throw new Error('binaryToDecimal does not support bigint')

    return isSigned ? getSignedInteger(binary) : parseInt(binary, 2);
}




function getSignedInteger(bits: string) {

    const negative = (bits[0] === '1');
    if (negative) {
        const inverse = getInverseBinary(bits)
        const integer =  (parseInt(inverse, 2) + 1) * -1;
        return integer
    } 
    else {
        return parseInt(bits, 2);
    }
}

function getInverseBinary(bits:string){
    let inverse = '';
        for (let i = 0; i < bits.length; i++) {
            inverse += (bits[i] === '0' ? '1' : '0');
        }
        return inverse
        
}


//relies on a string, but relevant only for strings to begin with. 
export function appendZeros(binary: string,requiredLength = 8) {

    let fullString = binary
    const numOfZerosMissing = requiredLength - binary.length
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



//relies on a string.seems to be relevant only for strings(not sure if must become generic)
export function groupBytes(bytes: Array<string>, groupSize: number) {
    const normalizedArray: Array<string> = []
    let currentBitString = ""
    for (let i = 1; i <= bytes.length; i++) {
        currentBitString += bytes[i - 1]
        if (i % groupSize === 0) {
            normalizedArray.push(currentBitString)
            currentBitString = ""
        }
    }
    return normalizedArray

}

export function splitBinaryStringToBytes(binaryString:string){
    const bytes = []
    let currentBitString=""
    for(let i=1;i<=binaryString.length;i++){
        currentBitString+=binaryString[i-1]
        if (i % 8 === 0 || i === binaryString.length) {
            bytes.push(currentBitString)
            currentBitString = ""
        }
    }
    return bytes
}



export function typedArrayToDecimals(typedArray: TypedArray) {
    const decimals = []
    for (let decimal of typedArray) {
        decimals.push(decimal)
    }
    return decimals;
}

export function decimalToHexaDecimal(decimal: number) {
    return  ((decimal)>>>0).toString(16).toUpperCase()
}

export function getBytesFromDecimal(decimal:number,{endianness='BIG' }: { endianness?:'LITTLE' | 'BIG' } = {}){

    if(!Number.isInteger(decimal))throw new Error('getBytesFromDecimal does not support floating point')

    const bytes =  getBytesFromBinary(decimalToBinary(decimal),{endianness})
    return bytes;
}


// function DecimalHexTwosComplement(decimal:number) {
//     var size = 8;
  
//     if (decimal >= 0) {
//       var hexadecimal = decimal.toString(16);
  
//       while ((hexadecimal.length % size) != 0) {
//         hexadecimal = "" + 0 + hexadecimal;
//       }
  
//       return hexadecimal;
//     } else {
//       var hexadecimal = Math.abs(decimal).toString(16);
//       debugger
//       while ((hexadecimal.length % size) != 0) {
//         hexadecimal = "" + 0 + hexadecimal;
//       }
  
//       var output = '';
//       for (let i = 0; i < hexadecimal.length; i++) {
//         output += (0x0F - parseInt(hexadecimal[i], 16)).toString(16);
//       }
  
//       output = (0x01 + parseInt(output, 16)).toString(16);
//       return output.toUpperCase();
//     }
//   }


// export function removeRedundantSignificantBytes(bytes:Array<string>,endianness:'LITTLE'|'BIG'){
//     // const counter = endianness === 'LITTLE' ? bytes.length-1 : 0 
//     if(endianness === 'LITTLE'){
//         // ['00010001', '00101000', '00001000', '00000000']
//         for(let i=bytes.length-1;i>0;i--){//
//             const currentByte = bytes[i]
//             if(parseInt(currentByte,2) !== 0)break;

//             if(parseInt(currentByte,2) === 0){
//                 bytes.splice(i,1)                
//             }
//         }
//     }else{
//         for(let i=0;i<bytes.length;i++){//
//             const currentByte = bytes[i]
//             if(parseInt(currentByte,2) !== 0)break;

//             if(parseInt(currentByte,2) === 0){
//                 bytes.splice(i,1)                
//             }
//         }
//     }
//     return bytes;
// }





// export function getBytesFromDecimal(decimal:number){    

//     const shouldUseSignedInteger = false
//     if(shouldUseSignedInteger)debugger
//     const thirtyTwoBitTypedArray = Number.isInteger(decimal) ?  new Uint32Array([decimal]) : new Float32Array([decimal])
//     const eightBitTypedArray = new Uint8Array(thirtyTwoBitTypedArray.buffer)

//     const bytes = []
//     for(let decimal of eightBitTypedArray){
//         bytes.push(appendZeros(decimalToBinary(decimal)))
//     }
    
//     return removeRedundantSignificantBytes(bytes,'LITTLE');
// }
