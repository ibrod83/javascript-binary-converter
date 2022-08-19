import { hexToBinary, hexToDecimal, hexToFloat } from "../utils/hex";



export default class HexConverter {

    constructor(protected original: string) { 

    }

    toBinary(){
        const binary = hexToBinary(this.original)
        return binary
    }

    toDecimal( { isSigned = false }: { isSigned?: boolean } = {}){
        const decimal = hexToDecimal(this.original,{isSigned})
        return decimal
    }


    toFloat( ){
        const float = hexToFloat(this.original)
        return float
    }



}