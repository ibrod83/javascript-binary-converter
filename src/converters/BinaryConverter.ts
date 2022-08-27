import { FloatConversionConfig } from "../sharedTypes";
import { binaryToFloat, binaryToInteger } from "../utils/binary";
import {  binaryToHexString } from "../utils/hex";

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

    toHexString( ){
       return binaryToHexString(this.original)
    }



}