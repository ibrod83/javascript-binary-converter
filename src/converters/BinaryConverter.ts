import { binaryToFloat, binaryToInteger } from "../utils/binary";
import { hexToBinary, hexToInteger, hexToFloat, binaryToHex } from "../utils/hex";

export default class BinaryConverter {

    constructor(protected original: string) { }



    toInteger({ isSigned = false }: { isSigned?: boolean } = {}) {
        const decimal = binaryToInteger(this.original, isSigned )
        return decimal
    }


    /**
     * Supports only float32 IEEE-754
     */
    toFloat() {
        if(this.original.length>32)throw new Error('Binary is longer than 32. Double precision float is not supported')
        const float = binaryToFloat(this.original)
        return float
    }

    toHex( ){
       return binaryToHex(this.original)
    }



}