import { BlobCreationConfig, BytesArray, ImageCreationConfig, TypedArray } from '../sharedTypes'
import { bytesToDecimals, typedArrayToBytes } from '../utils/binary'
import { getBlobClass } from '../utils/crossPlatform'
import { binaryToImage } from '../utils/image'


export default class TypedArrayConverter {

    constructor(private original: TypedArray) { }

    toUint8Array() {
        return new Uint8Array(this.original.buffer)
    }

    toInt8Array() {
        return new Int8Array(this.original.buffer)
    }

    toInt16Array() {
        const int16 = new Int16Array(this.original.buffer)
        return int16;
    }

    toUint16Array() {
        const uint16 = new Uint16Array(this.original.buffer)

        return uint16
    }

    toInt32Array() {
        return new Int32Array(this.original.buffer)
    }

    toUint32Array() {
        return new Uint32Array(this.original.buffer)
    }

    toBigUint64Array() {
        return new BigUint64Array(this.original.buffer)
    }

    toBigInt64Array() {
        return new BigInt64Array(this.original.buffer)
    }

    toFloat32(){
        return new Float32Array(this.original.buffer)
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

    toBytes():BytesArray{
        const bytes = this.original instanceof Uint8Array ? typedArrayToBytes(this.original) : typedArrayToBytes(new Uint8Array(this.original))
        return bytes;
    }

    toByteDecimals(){
        const bytes = this.toBytes();
        return bytesToDecimals(bytes)
    }


}