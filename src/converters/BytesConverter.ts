import { BlobCreationConfig, BytesArray, ImageCreationConfig, TypedArray } from "../sharedTypes"
import { appendZeros, binaryToDecimal, decimalToHexaDecimal, groupBytes, typedArrayToDecimals } from "../utils/binary"
import { getBlobClass } from "../utils/crossPlatform"
import { binaryToImage } from "../utils/image"
import { BaseBytesConverter } from "./BaseBytesConverter"



export default class BytesConverter extends BaseBytesConverter {

    constructor(protected original: BytesArray) {
        super(original)
        this.original = this.original.map(byte=> appendZeros(byte))//Make sure every byte has 8 bits, even if it's not mathematically needed

    }


    toUint8Array() {
        return new Uint8Array(this.original.map(binary => binaryToDecimal(binary)))

    }

    toInt8Array() {
        return new Int8Array(this.original.map(binary => binaryToDecimal(binary, true)))
    }

    toInt16Array() {
        // const normalizedBytes = groupBytes(this.original, 2)
        const decimals = this.original.map(b=>binaryToDecimal(b,true))
        return new Int16Array(new Int8Array(decimals).buffer)
    }

    toUint16Array() {
        const normalizedBytes = groupBytes(this.original, 2)
        return new Uint16Array(normalizedBytes.map(binary => binaryToDecimal(binary)))
    }

    toInt32Array() {
        const normalizedBytes = groupBytes(this.original, 4)
        return new Int32Array(normalizedBytes.map(binary => binaryToDecimal(binary, true)))
    }

    toUint32Array() {
        const normalizedBytes = groupBytes(this.original, 4)
        return new Uint32Array(normalizedBytes.map(binary => binaryToDecimal(binary, true)))
    }

    toFloat32Array(){
     
        const int32Array = this.toInt32Array() 
        const float32Array = new Float32Array(int32Array.buffer)
        return float32Array

    }

    /**
     * Defaults: isSigned = false, integerSize = 8
     */
    toDecimals({ isSigned = false, integerSize = 8 }: { isSigned?: boolean, integerSize?: 8 | 16 | 32 } = {}) {

        let typedArray:TypedArray;
        switch (integerSize) {
            
            case 8:
                return this.original.map(binary => binaryToDecimal(binary, isSigned))
            case 16:
                typedArray = isSigned ? this.toInt16Array() : this.toUint16Array()
                return typedArrayToDecimals(typedArray)
            case 32:
                typedArray = isSigned ? this.toInt32Array() : this.toUint32Array()
                return typedArrayToDecimals(typedArray)
            default:
                throw new Error('The integer size is invalid(8,16,32 are allowed)')   
        }
    }

    toHex({ isSigned = false }: { isSigned?: boolean } = {}){    
        return this.original.map((dec)=>decimalToHexaDecimal(binaryToDecimal(dec,isSigned)))
    }


}