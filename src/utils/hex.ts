import { FloatConversionConfig } from "../sharedTypes";
import { binaryToFloat,  getTwosComplementDecimal, } from "./binary";
import { normalizeBigInt } from "./number"

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



export function hexToFloat(hex: string,{ precision = 'SINGLE' }: FloatConversionConfig = {}) {
    if(precision === 'SINGLE'){        
    const decimalFromHex = hexToInteger(hex)
    const typedArray =  new Uint32Array([decimalFromHex])
    const floatTypedArray =   new Float32Array(typedArray.buffer) 
    return floatTypedArray[0]
    }
  
    //If double precision
    const binary = hexToBinary(hex)
    return binaryToFloat(binary,{precision})
   

}

