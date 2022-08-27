import {  FloatConversionConfig, ToBytesConfig } from "../sharedTypes"
import {  integerToBinary,  getBytesFromInteger, floatToBinary, bigIntegerToBinary,  getDecimalBytesFromInteger } from "../utils/binary"
import { bigIntegerToHexaDecimal, integerToHexaDecimal, floatToHexString, hexStringToFloat, hexStringToInteger } from "../utils/hex"
import { isBigInt, isFloat } from "../utils/number"




/**
 * This class handles any number|bigint, in any type Number notation(decimal,octal,hex,binary)
 */
export default class NumberConverter {

    constructor(protected original: number | bigint) { }


    toBinary({ precision = 'SINGLE' }: FloatConversionConfig = {}) {
        if (isBigInt(this.original)) return bigIntegerToBinary(this.original)
        return isFloat(this.original as number) ? floatToBinary(this.original as number,{precision}) : integerToBinary(this.original)
    }

    toInteger({ isSigned = false }: { isSigned?: boolean } = {}){
       
        if(!isSigned) //@ts-ignore
        return parseInt(this.original)

        const hex = this.original.toString(16)
        return hexStringToInteger(hex,{isSigned})
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

    toHexString({ precision = 'SINGLE' }: FloatConversionConfig = {}) {
        if (typeof this.original === 'number') {
            if (isFloat(this.original)) {
                return floatToHexString(this.original,{precision})
            }
            return integerToHexaDecimal(this.original)
        }

        return bigIntegerToHexaDecimal(this.original as bigint)
    }

    toFloat( { precision = 'SINGLE' }: FloatConversionConfig = {}){
        const float = hexStringToFloat(this.original.toString(16),{precision})
        return float
    }

    // toInteger( { isSigned = false }: { isSigned?: boolean } = {}){
    //     const decimal = hexStringToInteger(this.original,{isSigned})
    //     return decimal
    // }


}