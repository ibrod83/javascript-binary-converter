import { BlobCreationConfig, BytesArray, ImageCreationConfig } from "../sharedTypes.js"
import { binaryToDecimal, groupBytes } from "../utils/binary.js"
import { getBlobClass } from "../utils/crossPlatform.js"
import { binaryToImage } from "../utils/image.js"



export default class BytesConverter {

    constructor(private original: BytesArray) {
        if(!original.every(byte=>byte.length === 8)){
            throw new Error('Each element must be a "byte" - a string of 8 characters')
        }
     }

    toUint8Array() {
        // return new Uint8Array(this.original)
        return new Uint8Array(this.original.map(binary=>binaryToDecimal(binary)))

    }

    toInt8Array() {
        return new Int8Array(this.original.map(binary=>binaryToDecimal(binary,true)))
    }

    toInt16Array() {
        const normalizedBytes = groupBytes(this.original,2)
        return new Int16Array(normalizedBytes.map(binary=>binaryToDecimal(binary,true)))
    }

    toUint16Array() {
        const normalizedBytes = groupBytes(this.original,2)
        return new Uint16Array(normalizedBytes.map(binary=>binaryToDecimal(binary)))
    }

    toInt32Array() {
        const normalizedBytes = groupBytes(this.original,4)
        return new Int32Array(normalizedBytes.map(binary=>binaryToDecimal(binary,true)))
    }

    toUint32Array() {
        const normalizedBytes = groupBytes(this.original,4)
        return new Uint32Array(normalizedBytes.map(binary=>binaryToDecimal(binary,true)))
    }

    toText() {
        const uint8 = this.toUint8Array()

        const decoder = new TextDecoder()
        return decoder.decode(uint8)
    }


    async toBlob(config?:BlobCreationConfig): Promise<Blob> {
        const BlobClass =await  getBlobClass()
        return new BlobClass([this.toUint8Array()],config)
    }

    async toImage(config?: ImageCreationConfig) {
        const BlobClass =await  getBlobClass()
        const blob= new BlobClass([this.toUint8Array()])
        return binaryToImage(blob, config && config)
    }

    // toBytes(){
    //     const bytes = this.original instanceof Uint8Array ? uint8ToBytes(this.original) : uint8ToBytes(new Uint8Array(this.original))
    //     return bytes;
    // }


}