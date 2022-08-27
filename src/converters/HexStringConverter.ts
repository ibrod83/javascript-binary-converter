import { FloatConversionConfig } from "../sharedTypes";
import { hexStringToBinary, hexStringToInteger, hexStringToFloat } from "../utils/hex";
import NumberConverter from "./NumberConverter";


/**
 * To avoid precision loss(toFloat64), separate handling of hex strings seems to be needed
 */
export default class HexStringConverter {

    numberConverter!:NumberConverter
    constructor(protected original: string) { 
        this.numberConverter = new NumberConverter(parseInt(original,16))
    }        

    toBinary(){
        return this.numberConverter.toBinary()
    }

    toInteger( { isSigned = false }: { isSigned?: boolean } = {}){
        const decimal = hexStringToInteger(this.original,{isSigned})
        return decimal
    }

    toFloat( { precision = 'SINGLE' }: FloatConversionConfig = {}){
        const float = hexStringToFloat(this.original,{precision})
        return float
    }

}