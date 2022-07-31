import { BlobCreationConfig, BytesArray, DecimalBytesArray, ImageCreationConfig, TypedArray } from "../sharedTypes"
import { appendZeros, binaryToDecimal, decimalToBinary, decimalToHexaDecimal, groupByteDecimals, groupBytes, typedArrayToDecimals } from "../utils/binary"
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
        const normalizedBytes = groupByteDecimals(this.original, 2,false)
        return new Uint16Array(normalizedBytes)
    }

    toInt16Array() {
       
        const normalizedBytes = groupByteDecimals(this.original, 2,true)
        return new Int16Array(normalizedBytes)
    }

    toUint32Array() {
       
        const normalizedBytes = groupByteDecimals(this.original, 4,false)
        return new Uint32Array(normalizedBytes)
    }

    toInt32Array() {        
        const normalizedBytes = groupByteDecimals(this.original, 4,true)
        return new Int32Array(normalizedBytes)
    }
   
    toHex(){   

        return this.original.map((dec)=>decimalToHexaDecimal(dec))
    }


}