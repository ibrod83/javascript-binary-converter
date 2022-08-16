import { bigDecimalToHexaDecimal, decimalToBinary, decimalToHexaDecimal, getBytesFromDecimal, floatToBinary, bigDecimalToBinary, floatToHex } from "../utils/binary"
import { isBigInt, isFloat } from "../utils/number"



export default class DecimalConverter {

    constructor(protected original: number | bigint) { }


    toBinary() {
        if (isBigInt(this.original)) return bigDecimalToBinary(this.original)
        return isFloat(this.original as number) ? floatToBinary(this.original as number) : decimalToBinary(this.original)
    }

    /**
     * Does not support bigint(above 32 bit) or floating point. Returns bytes in the order corresponding the system's endianness 
     * The default byte order is "big endian", meaning most significant byte is first.
     */
    toBytes({ endianness = 'BIG' }: { endianness?: 'LITTLE' | 'BIG' } = {}) {
        return getBytesFromDecimal(this.original, { endianness })
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