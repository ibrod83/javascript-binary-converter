import { BlobCreationConfig, BytesArray, DecimalBytesArray, ImageCreationConfig, TypedArray } from "../sharedTypes"
import { appendZeros, binaryToDecimal, decimalToBinary, decimalToHexaDecimal,  groupBytes, typedArrayToDecimals } from "../utils/binary"
import { getBlobClass } from "../utils/crossPlatform"
import { binaryToImage } from "../utils/image"
import { BaseBytesConverter } from "./BaseBytesConverter"



export default class DecimalBytesConverter extends BaseBytesConverter {

    constructor(protected original: DecimalBytesArray) {
        super(original)
     }


    toUint8Array() {
        return new Uint8Array(this.original)

    }

    toInt8Array() {
        return new Int8Array(this.original)
    }
   

    toUint16Array() {     

        return new Uint16Array(this.toUint8Array().buffer)

    }

    toInt16Array() {

        const int8 = this.toInt8Array()
        const int16 = new Int16Array(int8.buffer)
        return int16
    }

    toUint32Array() {

        return new Uint32Array(this.toUint8Array().buffer)
    }

    toInt32Array() {       

        return new Int32Array(this.toInt8Array().buffer)
    }

    toBigUint64Array() {       

        return new BigUint64Array(this.toUint8Array().buffer)
    }
    
    toBigInt64Array() {       

        return new BigInt64Array(this.toInt8Array().buffer)
    }
   
    toHex(){   

        return this.original.map((dec)=>decimalToHexaDecimal(dec))
    }


}