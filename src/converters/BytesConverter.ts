import {  BytesArray,  TypedArray } from "../sharedTypes"
import {  binaryToDecimal   } from "../utils/binary"
import { decimalToHexaDecimal } from "../utils/hex"
import { padString } from "../utils/string"
import { typedArrayToDecimals } from "../utils/typedArray"
import { BaseBytesConverter } from "./BaseBytesConverter"

export default class BytesConverter extends BaseBytesConverter {

    constructor(protected original: BytesArray) {
        super(original)
        this.original = this.original.map(byte => padString(byte))//Make sure every byte has 8 bits, even if it's not mathematically needed

    }

    private _getDecimals(isSigned: boolean = false) {
        return this.original.map(binary => binaryToDecimal(binary, isSigned))
    }


    toUint8Array() {
        return new Uint8Array(this._getDecimals())

    }

    toInt8Array() {
        return new Int8Array(this._getDecimals(true))
    }



    toUint16Array() {
        const decimals = this._getDecimals(false)
        return new Uint16Array(new Uint8Array(decimals).buffer)
    }

    toInt16Array() {
        const decimals = this._getDecimals(true)
        return new Int16Array(new Int8Array(decimals).buffer)
    }

    toUint32Array() {
        const decimals = this._getDecimals(false)
        return new Uint32Array(new Uint8Array(decimals).buffer)
    }

    toInt32Array() {
        const decimals = this._getDecimals(true)
        return new Int32Array(new Int8Array(decimals).buffer)
    }

    toBigInt64Array() {
        const decimals = this._getDecimals(true)
        const bigintArray = new BigInt64Array(new Int8Array(decimals).buffer)
        return bigintArray
    }


    toBigUint64Array() {
        const decimals = this._getDecimals(true)//
        const bigintArray = new BigUint64Array(new Uint8Array(decimals).buffer)
        return bigintArray
    }



    toFloat32Array() {

        const int32Array = this.toInt32Array()
        const float32Array = new Float32Array(int32Array.buffer)
        return float32Array

    }

    /**
     * Defaults: isSigned = false, integerSize = 8
     */
    toDecimals({ isSigned = false, integerSize = 8 }: { isSigned?: boolean, integerSize?: 8 | 16 | 32 | 64 } = {}) {

        let typedArray: TypedArray;
        switch (integerSize) {

            case 8:
                return this.original.map(binary => binaryToDecimal(binary, isSigned))
            case 16:
                typedArray = isSigned ? this.toInt16Array() : this.toUint16Array()
                return typedArrayToDecimals(typedArray)
            case 32:
                typedArray = isSigned ? this.toInt32Array() : this.toUint32Array()
                return typedArrayToDecimals(typedArray)
            case 64:
                typedArray = isSigned ? this.toBigInt64Array() : this.toBigUint64Array()
                return typedArrayToDecimals(typedArray)
            default:
                throw new Error('The integer size is invalid(8,16,32,64 are allowed)')
        }
    }

    toHex({ isSigned = false }: { isSigned?: boolean } = {}) {
        return this.original.map((dec) => decimalToHexaDecimal(binaryToDecimal(dec, isSigned)))
    }


}