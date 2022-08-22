import {  FloatConversionConfig, ToBytesConfig } from "../sharedTypes"
import {  integerToBinary,  getBytesFromInteger, floatToBinary, bigIntegerToBinary,  getDecimalBytesFromInteger } from "../utils/binary"
import { bigIntegerToHexaDecimal, integerToHexaDecimal, floatToHex } from "../utils/hex"
import { isBigInt, isFloat } from "../utils/number"




export default class IntegerConverter {

    constructor(protected original: number | bigint) { }


    toBinary({ precision = 'SINGLE' }: FloatConversionConfig = {}) {
        if (isBigInt(this.original)) return bigIntegerToBinary(this.original)
        return isFloat(this.original as number) ? floatToBinary(this.original as number,{precision}) : integerToBinary(this.original)
    }

    /**
     * Does not support bigint(above 32 bit) or floating point.
     */
    toBytes({ endianness = 'BIG' }: Omit<ToBytesConfig,'isSigned'> = {}) {
        return getBytesFromInteger(this.original, { endianness })
    }

    toDecimalBytes({ endianness = 'BIG',isSigned=false }: ToBytesConfig = {}) {//
        return getDecimalBytesFromInteger(this.original,{endianness,isSigned})
    }

    toHex({ precision = 'SINGLE' }: FloatConversionConfig = {}) {
        if (typeof this.original === 'number') {
            if (isFloat(this.original)) {
                return floatToHex(this.original,{precision})
            }
            return integerToHexaDecimal(this.original)
        }

        return bigIntegerToHexaDecimal(this.original as bigint)
    }


}