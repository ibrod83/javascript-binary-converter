import { BlobCreationConfig, ImageCreationConfig, TypedArray } from '../sharedTypes.js'
import { uint8ToBytes } from '../utils/binary.js'
import { getBlobClass } from '../utils/crossPlatform.js'
import { binaryToImage } from '../utils/image.js'


export default class TypedArrayConverter {

    constructor(private original: TypedArray) { }

    toUint8Array() {
        return new Uint8Array(this.original)
    }

    toInt8Array() {
        return new Int8Array(this.original)
    }

    toInt16Array() {
        const int16 = new Int16Array(this.original)
        return int16;
    }

    toUint16Array() {//
        const uint16 = new Uint16Array(this.original)

        return uint16
    }

    toInt32Array() {
        return new Int32Array(this.original)
    }

    toUint32Array() {
        return new Uint32Array(this.original)
    }

    toText() {
        const decoder = new TextDecoder()
        return decoder.decode(this.original)
    }


    async toBlob(config?:BlobCreationConfig): Promise<Blob> {
        const BlobClass =await  getBlobClass()
        return new BlobClass([this.original],config)
    }

    async toImage(config?: ImageCreationConfig) {
        return binaryToImage(await this.toBlob(), config && config)
    }

    toBytes(){
        const bytes = this.original instanceof Uint8Array ? uint8ToBytes(this.original) : uint8ToBytes(new Uint8Array(this.original))
        return bytes;
    }


}