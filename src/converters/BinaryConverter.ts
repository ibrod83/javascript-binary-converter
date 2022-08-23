import { FloatConversionConfig } from "../sharedTypes";
import { binaryToFloat, binaryToInteger } from "../utils/binary";
import { hexToBinary, hexToInteger, hexToFloat, binaryToHex } from "../utils/hex";

export default class BinaryConverter {

    constructor(protected original: string) { }



    toInteger({ isSigned = false }: { isSigned?: boolean } = {}) {
        const decimal = binaryToInteger(this.original, isSigned )
        return decimal
    }


    
    toFloat({ precision = 'SINGLE' }: FloatConversionConfig = {}) {
        const float = binaryToFloat(this.original,{precision})
        return float
    }

    toHex( ){
       return binaryToHex(this.original)
    }



}