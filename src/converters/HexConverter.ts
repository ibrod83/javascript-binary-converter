import { hexToBinary, hexToInteger, hexToFloat } from "../utils/hex";

export default class HexConverter {

    constructor(protected original: string) { 

    }

    toBinary(){
        const binary = hexToBinary(this.original)
        return binary
    }

    toInteger( { isSigned = false }: { isSigned?: boolean } = {}){
        const decimal = hexToInteger(this.original,{isSigned})
        return decimal
    }


    /**
     * Supports only float32 IEEE-754
     */
    toFloat( ){
        if(this.original.length>32)throw new Error('Binary is longer than 32. Double precision float is not supported')
        const float = hexToFloat(this.original)
        return float
    }



}