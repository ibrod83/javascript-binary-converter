import { TypedArray } from "../sharedTypes";

export function decimalToBinary(decimal: number) {

    const binary =  (decimal >>> 0).toString(2);
    return binary;

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

// export function groupByteDecimals(byteDecimals: Array<number>, groupSize: number,isSigned:boolean) {
//     const min = isSigned ? -128 : 0
//     const max = isSigned ? 127 : 255;
//     if(!byteDecimals.every(byte=>byte>= min && byte<=max)){
//         debugger;
//         throw new Error(`A byteDecimal must be between ${min} and ${max}`)
//     }
   
//     const normalizedArray: Array<number> = []
//     let currentBitString = ""
//     for (let i = 1; i <= byteDecimals.length; i++) {
//         const binary = decimalToBinary(byteDecimals[i - 1])//Important: the function might return a binary of more than one byte!
//         if(binary.length > 8){
//             // debugger;
//         }
//         currentBitString += binary.length < 8 ? appendZeros(binary) : binary.slice(binary.length-8);//Make sure the bit string is of length 8!   
//         if (i % groupSize === 0) {            
//             normalizedArray.push(binaryToDecimal(currentBitString,isSigned))
//             if(binary.length > 8){
//                 // debugger;
//             }   
//             currentBitString = ""
//         }
//     }
//     return normalizedArray

// }

export function typedArrayToDecimals(typedArray: TypedArray) {
    const decimals = []
    for (let decimal of typedArray) {
        decimals.push(decimal)
    }
    return decimals;
}

export function decimalToHexaDecimal(decimal: number) {
    // debugger
    return  ((decimal)>>>0).toString(16).toUpperCase()
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