import { ToBytesConfig } from "../sharedTypes"
import { bigDecimalToHexaDecimal, decimalToBinary, decimalToHexaDecimal, getBytesFromDecimal, floatToBinary, bigDecimalToBinary, floatToHex, binaryToDecimal, getByteDecimalsFromDecimal } from "../utils/binary"
import { isBigInt, isFloat } from "../utils/number"



export default class DecimalConverter {

    constructor(protected original: number | bigint) { }


    toBinary() {
        if (isBigInt(this.original)) return bigDecimalToBinary(this.original)
        return isFloat(this.original as number) ? floatToBinary(this.original as number) : decimalToBinary(this.original)
    }

    /**
     * Does not support bigint(above 32 bit) or floating point.
     */
    toBytes({ endianness = 'BIG' }: Omit<ToBytesConfig,'isSigned'> = {}) {
        return getBytesFromDecimal(this.original, { endianness })
    }

    toByteDecimals({ endianness = 'BIG',isSigned=false }: ToBytesConfig = {}) {//
        return getByteDecimalsFromDecimal(this.original,{endianness,isSigned})
    }

    toHex() {
        if (typeof this.original === 'number') {
            if (isFloat(this.original)) {
                return floatToHex(this.original)
            }
            return decimalToHexaDecimal(this.original)
        }

        return bigDecimalToHexaDecimal(this.original as bigint)
    }


}