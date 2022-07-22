import { BytesArray } from "../sharedTypes.js"
import { binaryToDecimal } from "../utils/binary.js"



export default class BytesConverter {

    constructor(private original: BytesArray) { }

    toUint8Array() {
        // return new Uint8Array(this.original)
        return new Uint8Array(this.original.map(binary=>binaryToDecimal(binary)))

    }

    toInt8Array() {
        return new Int8Array(this.original.map(binary=>binaryToDecimal(binary,true)))
    }

    toInt16Array() {
        return new Int16Array(this.original.map(binary=>binaryToDecimal(binary,true)))
    }

    toUint16Array() {//
        return new Uint16Array(this.original.map(binary=>binaryToDecimal(binary)))
    }

    toInt32Array() {
        return new Int32Array(this.original.map(binary=>binaryToDecimal(binary,true)))
    }

    // toUint32Array() {
    //     return new Uint32Array(this.original)
    // }

    // toText() {
    //     const decoder = new TextDecoder()
    //     return decoder.decode(this.original)
    // }


    // async toBlob(): Promise<Blob> {
    //     const BlobClass =await  getBlobClass()
    //     return new BlobClass([this.original])
    // }

    // async toImage(config?: ImageCreationConfig) {
    //     return binaryToImage(await this.toBlob(), config && config)
    // }

    // toBytes(){
    //     const bytes = this.original instanceof Uint8Array ? uint8ToBytes(this.original) : uint8ToBytes(new Uint8Array(this.original))
    //     return bytes;
    // }


}