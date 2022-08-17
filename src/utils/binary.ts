import { BytesArray, TypedArray } from "../sharedTypes";
import { getSystemEndianness } from "./crossPlatform";
import { getClosestDividable, isBigInt, isFloat } from "./number";
import { padString } from "./string";

export function decimalToBinary(decimal: number | bigint) {
    const binary = (decimal as number >>> 0).toString(2);
    return binary;
}


export function floatToBinary(float: number) {
    const float32 = new Float32Array([float])
    const int8 = new Uint8Array(float32.buffer)
    const bytes = typedArrayToBytes(int8)
    const endianness = getSystemEndianness()
    return endianness === 'LITTLE' ? bytes.reverse().join("") : bytes.join("")
}


export function bigDecimalToBinary(decimal: number | bigint, nBits = BigInt(64), asHex = false): string {

    [decimal, nBits] = [BigInt(decimal), BigInt(nBits)];

    // if ((decimal > 0 && decimal >= BigInt(2) ** (nBits - BigInt(1))) || (decimal < 0 && -decimal > BigInt(2) ** (nBits - BigInt(1)))) {
    //   throw new RangeError("overflow error");
    // }

    const notation = asHex ? 16 : 2

    if (decimal >= 0) {
        return decimal.toString(notation)
    }

    const bigint = (BigInt(BigInt(2) ** nBits) + decimal)

    return bigint.toString(notation)
}



export function getBytesFromBinary(binaryString: string, { endianness = 'LITTLE' }: { endianness?: 'BIG' | 'LITTLE' } = {}) {
    if (binaryString.length <= 7) return [padString(binaryString)];

    let closestDividableOfEight = getClosestDividable(binaryString.length, 8);
    const binaryStringWithAppendedZeros = padString(binaryString, closestDividableOfEight)
    let bytes = splitBinaryStringToBytes(binaryStringWithAppendedZeros)
    return endianness === 'LITTLE' ? bytes.reverse() : bytes;

}


export function binaryToDecimal(binary: string, isSigned: boolean = false) {

    if (binary.length > 32) throw new Error('binaryToDecimal does not support bigint')

    return isSigned ? getSignedInteger(binary) : parseInt(binary, 2);
}




function getSignedInteger(bits: string) {

    const negative = (bits[0] === '1');
    if (negative) {
        const inverse = getInverseBinary(bits)
        const integer = (parseInt(inverse, 2) + 1) * -1;
        return integer
    }
    else {
        return parseInt(bits, 2);
    }
}



function getInverseBinary(bits: string) {
    let inverse = '';
    for (let i = 0; i < bits.length; i++) {
        inverse += (bits[i] === '0' ? '1' : '0');
    }
    return inverse

}



export function typedArrayToBytes(typedArray: TypedArray) {
    const bytes: Array<string> = []
    for (let decimal of typedArray) {
        const binary = decimalToBinary(decimal);
        bytes.push(padString(binary, 8))
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

export function splitBinaryStringToBytes(binaryString: string) {
    const bytes = []
    let currentBitString = ""
    for (let i = 1; i <= binaryString.length; i++) {
        currentBitString += binaryString[i - 1]
        if (i % 8 === 0 || i === binaryString.length) {
            bytes.push(currentBitString)
            currentBitString = ""
        }
    }
    return bytes
}



export function decimalToHexaDecimal(decimal: number) {
    return ((decimal) >>> 0).toString(16).toUpperCase()
}

export function bigDecimalToHexaDecimal(decimal: bigint) {
    return bigDecimalToBinary(decimal, undefined, true).toUpperCase()//
}

export function floatToHex(float: number) {
    const getHex = (i:number) => ('00' + i.toString(16)).slice(-2);

    const view = new DataView(new ArrayBuffer(4))
        
    view.setFloat32(0, float);
    
    const hex = Array
    //@ts-ignore
        .apply(null, { length: 4 })
        .map((_, i) => getHex(view.getUint8(i)))
        .join('');

    return hex.toLocaleUpperCase();
}

export function getBytesFromDecimal(decimal: number | bigint, { endianness = 'BIG' }: { endianness?: 'LITTLE' | 'BIG' } = {}) {

    if (typeof decimal === 'number' && isFloat(decimal)) return getBytesFromBinary(floatToBinary(decimal))

    const bytes = getBytesFromBinary(isBigInt(decimal) ? bigDecimalToBinary(decimal) : decimalToBinary(decimal), { endianness })
    return bytes;
}

export function getByteDecimalsFromDecimal(decimal: number | bigint, { endianness = 'BIG',isSigned=false }: { endianness?: 'LITTLE' | 'BIG',isSigned?:boolean } = {}) {

    const bytes = getBytesFromDecimal(decimal,{endianness})
    return bytes.map(byte=>binaryToDecimal(byte,isSigned))
}

export function arrayBufferToBytes(arrayBuffer: ArrayBuffer) {
    const uint8 = new Uint8Array(arrayBuffer)
    return typedArrayToBytes(uint8)
}

export function bytesToDecimals(bytes:BytesArray){
    return bytes.map(byte=>binaryToDecimal(byte))
}


export function arrayBufferToByteDecimals(arrayBuffer: ArrayBuffer,{isSigned=false}:{isSigned?:boolean}={}) {
    const typedArray =  isSigned ? new Int8Array(arrayBuffer) :  new Uint8Array(arrayBuffer)
    // return typedArrayToBytes(uint8)
    return Array.from(typedArray)
}



