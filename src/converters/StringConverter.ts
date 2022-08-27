import { stringToBinary } from "../utils/string";

export default class StringConverter {

    constructor(protected original: string) { }
        

    toBinary(){
        const binary = stringToBinary(this.original)
        return binary
    }

    toUint8Array(){
        const encoder = new TextEncoder()
        return encoder.encode(this.original)
    }    




}