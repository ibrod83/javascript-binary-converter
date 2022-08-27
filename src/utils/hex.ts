import { FloatConversionConfig } from "../sharedTypes";
import { binaryToFloat, getDecimalFromTwosComplementBinary, } from "./binary";
import { normalizeBigInt } from "./number"
import { padString, splitStringToChunks } from "./string";

export function integerToHexaDecimal(integer: number) {
    return ((integer) >>> 0).toString(16).toUpperCase()
}

export function bigIntegerToHexaDecimal(integer: bigint) {
    const normalizedBigInt = normalizeBigInt(integer)
    return normalizedBigInt.toString(16).toUpperCase()
}

export function floatToHexString(float: number, { precision = 'SINGLE' }: FloatConversionConfig = {}) {
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
        .apply(null, { length: numberOfBytes })
        .map((_, i) => getHex(view.getUint8(i)))
        .join('');

    // return hex.toLocaleUpperCase();
    return hex.toLocaleUpperCase();
}

export function hexStringToBinary(hex: string) {
    return parseInt(hex, 16).toString(2).toUpperCase()
}


export function binaryToHexString(binary: string, { isSigned = false }: { isSigned?: boolean } = {}) {
    var hex = parseInt(binary, 2).toString(16).toUpperCase();
    return hex;
}

export function hexStringToInteger(hex: string, { isSigned = false }: { isSigned?: boolean } = {}) {
    if (!isSigned) {
        return parseInt(hex, 16)
    }
    else {
        const binaryFromHex = hexStringToBinary(hex)
        const twosComplementDecimal = getDecimalFromTwosComplementBinary(binaryFromHex);
        return twosComplementDecimal
    }
}



function normalizeHex(hex:string,requireHexLength:number){
    if (hex[1] === 'x' || hex[1] === 'X') {
        hex = hex.slice(2);
    }
    return padString(hex,requireHexLength,'0')
}


export function hexStringToFloat(hex: string, { precision = 'SINGLE' }: FloatConversionConfig = {}) {
    const numBits = precision === 'SINGLE' ? 32 : 64;
    const numBytes = numBits / 8
    hex= normalizeHex(hex,numBytes*2)

    const bytes = splitHexStringToHexBytes(hex)
    var buffer = new ArrayBuffer(numBytes);
    var uint8 = new Uint8Array(buffer);
 
    for (let i = 0; i < bytes.length; i++) {
        uint8[i] = parseInt(bytes[i], 16)
    }
    var view = new DataView(buffer);
    return precision === 'SINGLE' ? view.getFloat32(0, false) : view.getFloat64(0, false)

}

export function splitHexStringToHexBytes(binaryString: string) {
    return splitStringToChunks(binaryString, 2)
}

