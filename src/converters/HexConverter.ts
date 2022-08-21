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


    toFloat( ){
        const float = hexToFloat(this.original)
        return float
    }



}