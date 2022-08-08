import { BlobCreationConfig, BytesArray, DecimalBytesArray, ImageCreationConfig, TypedArray } from "../sharedTypes"
import { appendZeros, binaryToDecimal, decimalToBinary, decimalToHexaDecimal,  getBytesFromBinary,  getBytesFromDecimal,  groupBytes, splitBinaryStringToBytes, typedArrayToDecimals } from "../utils/binary"
import { getBlobClass } from "../utils/crossPlatform"
import { binaryToImage } from "../utils/image"
import { BaseBytesConverter } from "./BaseBytesConverter"



export default class DecimalConverter {

    constructor(protected original: number) { }


    toBinary(){
        return decimalToBinary(this.original)
    }

    /**
     * Does not support bigint(above 32 bit) or floating point. Returns bytes in the order corresponding the system's endianness 
     * The default byte order is "big endian", meaning most significant byte is first.
     */
    toBytes({endianness='BIG' }: { endianness?:'LITTLE' | 'BIG' } = {}) {        
        return getBytesFromDecimal(this.original,{endianness})
    }

    toHex() {

        return decimalToHexaDecimal(this.original)
    }


}