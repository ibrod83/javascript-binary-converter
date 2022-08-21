import { binaryToInteger, getTwosComplementDecimal, } from "./binary";
import { getTwosComplementBinary } from "./bits";
import { normalizeBigInt } from "./number"

export function integerToHexaDecimal(integer: number) {
    return ((integer) >>> 0).toString(16).toUpperCase()
}

export function bigIntegerToHexaDecimal(integer: bigint) {
    const normalizedBigInt = normalizeBigInt(integer)
    return normalizedBigInt.toString(16).toUpperCase()
}

export function floatToHex(float: number) {
    const getHex = (i: number) => ('00' + i.toString(16)).slice(-2);

    const view = new DataView(new ArrayBuffer(4))

    view.setFloat32(0, float);

    const hex = Array
        //@ts-ignore
        .apply(null, { length: 4 })
        .map((_, i) => getHex(view.getUint8(i)))
        .join('');

    return hex.toLocaleUpperCase();
}

export function hexToBinary(hex: string) {
    return parseInt(hex, 16).toString(2).toUpperCase()
}

export function hexToInteger(hex: string, { isSigned = false }: { isSigned?: boolean } = {}) {
    if (!isSigned) {
        return parseInt(hex, 16)
    } else {
        const binaryFromHex = hexToBinary(hex)
        const twosComplementDecimal = getTwosComplementDecimal(binaryFromHex);
        return twosComplementDecimal
    }
}


export function hexToFloat(hex: string) {
    const decimalFromHex = hexToInteger(hex)
    const int32 = new Uint32Array([decimalFromHex])
    const float32 = new Float32Array(int32.buffer)
    return float32[0]
    // return parseInt(hex, 16)
}

// export function hexToFloat(hex: string, { isSigned = false }: { isSigned?: boolean } = {}) {
//     const decimalFromHex = hexToInteger(hex)
//     let int32;
//     if (!isSigned) {
//         int32 = new Uint32Array([decimalFromHex])
//     } else {
//         const binaryFromHex = hexToBinary(hex)
//         const twosComplementBinary = getTwosComplementBinary(binaryFromHex)
//         const twosComplementDecimal = binaryToInteger(twosComplementBinary);
//         int32 = new Int32Array([twosComplementDecimal])
//     }

//     const float32 = new Float32Array(int32.buffer)
//     return float32[0]
//     // return parseInt(hex, 16)
// }
