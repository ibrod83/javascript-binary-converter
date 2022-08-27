import {  BytesArray,  TypedArray } from "../sharedTypes"
import {  binaryToInteger   } from "../utils/binary"
import { integerToHexaDecimal } from "../utils/hex"
import { padString } from "../utils/string"
import { typedArrayToIntegers } from "../utils/typedArray"
import { BaseBytesConverter } from "./BaseBytesConverter"

export default class BytesConverter extends BaseBytesConverter {

    constructor(protected original: BytesArray) {
        super(original)
        this.original = this.original.map(byte => padString(byte))//Make sure every byte has 8 bits, even if it's not mathematically needed

    }

    private _getIntegers(isSigned: boolean = false) {
        return this.original.map(binary => binaryToInteger(binary, isSigned))
    }


    toUint8Array() {
        return new Uint8Array(this._getIntegers())

    }

    toInt8Array() {
        return new Int8Array(this._getIntegers(true))
    }



    toUint16Array() {
        const integers = this._getIntegers(false)
        return new Uint16Array(new Uint8Array(integers).buffer)
    }

    toInt16Array() {
        const integers = this._getIntegers(true)
        return new Int16Array(new Int8Array(integers).buffer)
    }

    toUint32Array() {
        const integers = this._getIntegers(false)
        return new Uint32Array(new Uint8Array(integers).buffer)
    }

    toInt32Array() {
        const integers = this._getIntegers(true)
        return new Int32Array(new Int8Array(integers).buffer)
    }

    toBigInt64Array() {
        const integers = this._getIntegers(true)
        const bigintArray = new BigInt64Array(new Int8Array(integers).buffer)
        return bigintArray
    }


    toBigUint64Array() {
        const integers = this._getIntegers(true)//
        const bigintArray = new BigUint64Array(new Uint8Array(integers).buffer)
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
    toIntegers({ isSigned = false, integerSize = 8 }: { isSigned?: boolean, integerSize?: 8 | 16 | 32 | 64 } = {}) {

        let typedArray: TypedArray;
        switch (integerSize) {

            case 8:
                return this.original.map(binary => binaryToInteger(binary, isSigned))
            case 16:
                typedArray = isSigned ? this.toInt16Array() : this.toUint16Array()
                return typedArrayToIntegers(typedArray)
            case 32:
                typedArray = isSigned ? this.toInt32Array() : this.toUint32Array()
                return typedArrayToIntegers(typedArray)
            case 64:
                typedArray = isSigned ? this.toBigInt64Array() : this.toBigUint64Array()
                return typedArrayToIntegers(typedArray)
            default:
                throw new Error('The integer size is invalid(8,16,32,64 are allowed)')
        }
    }

    toHexString({ isSigned = false }: { isSigned?: boolean } = {}) {
        return this.original.map((int) => integerToHexaDecimal(binaryToInteger(int, isSigned)))
    }


}