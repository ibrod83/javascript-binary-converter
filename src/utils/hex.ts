import { FloatConversionConfig } from "../sharedTypes";
import { binaryToInteger, getTwosComplementDecimal, } from "./binary";
import { splitBinaryStringToBytes } from "./bits";
import { normalizeBigInt } from "./number"
import { padString } from "./string";

export function integerToHexaDecimal(integer: number) {
    return ((integer) >>> 0).toString(16).toUpperCase()
}

export function bigIntegerToHexaDecimal(integer: bigint) {
    const normalizedBigInt = normalizeBigInt(integer)
    return normalizedBigInt.toString(16).toUpperCase()
}

export function floatToHex(float: number, { precision = 'SINGLE' }: FloatConversionConfig= {}) {
    const getHex = (i: number) => ('00' + i.toString(16)).slice(-2);

    const numberOfBytes = precision === 'SINGLE' ? 4 : 8

    const view = new DataView(new ArrayBuffer(numberOfBytes))
    
    if (precision === 'SINGLE') {
        view.setFloat32(0, float);
    } else {
        view.setFloat64(0, float);
    }

    const hex = Array
        //@ts-ignore
        .apply(null, { length:  numberOfBytes })
        .map((_, i) => getHex(view.getUint8(i)))
        .join('');

    return hex.toLocaleUpperCase();
}

export function hexToBinary(hex: string) {
    return parseInt(hex, 16).toString(2).toUpperCase()
}


export function binaryToHex(binary: string, { isSigned = false }: { isSigned?: boolean } = {}){
    var hex = parseInt(binary, 2).toString(16).toUpperCase();
    return hex;
}

export function hexToInteger(hex: string, { isSigned = false }: { isSigned?: boolean } = {}) {
    if (!isSigned) {
        return parseInt(hex, 16)
    }
     else {
        const binaryFromHex = hexToBinary(hex)
        const twosComplementDecimal = getTwosComplementDecimal(binaryFromHex);
        return twosComplementDecimal
    }
}





export function hexToFloat(hex: string) {
    const decimalFromHex = hexToInteger(hex)
    const typedArray =  new Uint32Array([decimalFromHex])
    const floatTypedArray =   new Float32Array(typedArray.buffer) 
    return floatTypedArray[0]

}


// export function hexToFloat(binary: string, { precision = 'SINGLE' }: FloatConversionConfig = {}) {
//     const numBits = precision === 'SINGLE' ? 32 : 64;
//     const numBytes = numBits/8
//     binary = padString(binary,numBits)
//     const bytes = splitBinaryStringToBytes(binary)
//     var buffer = new ArrayBuffer(numBytes);
//     var uint8 = new Uint8Array(buffer);
//     for (let i=0;i<bytes.length;i++) {
 
//         uint8[i] = binaryToInteger(bytes[i])
//     }
//     var view = new DataView(buffer);
//     return precision === 'SINGLE' ?  view.getFloat32(0, false) : view.getFloat64(0, false)  

// }

