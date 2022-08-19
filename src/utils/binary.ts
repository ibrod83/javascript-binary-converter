import { BytesArray, TypedArray } from "../sharedTypes";
import { getTwosComplementBinary, splitBinaryStringToBytes } from "./bits";
import { getSystemEndianness } from "./crossPlatform";
import { getClosestDividable, isBigInt, isFloat, normalizeBigInt } from "./number";
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



export function bigDecimalToBinary(decimal: number | bigint, nBits = BigInt(64)): string {

    const normalizedBigInt = normalizeBigInt(decimal, nBits)
    return normalizedBigInt.toString(2)

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


export function getSignedInteger(bits: string) {

    const negative = (bits[0] === '1');
    if (negative) {
        return getTwosComplementDecimal(bits)//
    }
    else {
        return parseInt(bits, 2);
    }
}

export function getTwosComplementDecimal(binary: string) {
    const twosComplementBinary = getTwosComplementBinary(binary)
   return parseInt(twosComplementBinary,2) * -1;
    
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


export function getBytesFromDecimal(decimal: number | bigint, { endianness = 'BIG' }: { endianness?: 'LITTLE' | 'BIG' } = {}) {

    if (typeof decimal === 'number' && isFloat(decimal)) return getBytesFromBinary(floatToBinary(decimal))

    const bytes = getBytesFromBinary(isBigInt(decimal) ? bigDecimalToBinary(decimal) : decimalToBinary(decimal), { endianness })
    return bytes;
}

export function getByteDecimalsFromDecimal(decimal: number | bigint, { endianness = 'BIG', isSigned = false }: { endianness?: 'LITTLE' | 'BIG', isSigned?: boolean } = {}) {

    const bytes = getBytesFromDecimal(decimal, { endianness })
    return bytes.map(byte => binaryToDecimal(byte, isSigned))
}

export function arrayBufferToBytes(arrayBuffer: ArrayBuffer) {
    const uint8 = new Uint8Array(arrayBuffer)
    return typedArrayToBytes(uint8)
}

export function bytesToDecimals(bytes: BytesArray) {
    return bytes.map(byte => binaryToDecimal(byte))
}


export function arrayBufferToByteDecimals(arrayBuffer: ArrayBuffer, { isSigned = false }: { isSigned?: boolean } = {}) {
    const typedArray = isSigned ? new Int8Array(arrayBuffer) : new Uint8Array(arrayBuffer)
    return Array.from(typedArray)
}



