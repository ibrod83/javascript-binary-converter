import { BlobCreationConfig, BytesArray, ImageCreationConfig, ToBytesConfig } from "../sharedTypes";
import { arrayBufferToByteDecimals, arrayBufferToBytes, } from "../utils/binary";
import { getBlobClass } from "../utils/crossPlatform";
import { binaryToImage } from "../utils/image";

export default class ArrayBufferConverter {

    constructor(private original: ArrayBuffer) { }//

    async toImage({ type = 'image/jpeg', maxSize = undefined }: ImageCreationConfig = {}) {
        const uint8 = new Uint8Array(this.original)
        const blob = new Blob([uint8], { type })
        const image = maxSize ? await binaryToImage(blob, { maxSize }) : await binaryToImage(blob)
        return image;
    }

    async toBlob(config?:BlobCreationConfig): Promise<Blob> {
        const BlobClass =await  getBlobClass()
        return new BlobClass([this.toUint8Array()],config)
    }

    toUint8Array() {

        return new Uint8Array(this.original)
    }

    toInt8Array() {

        return new Int8Array(this.original)
    }

    toUint16Array() {

        return new Uint16Array(this.original)
    }

    toInt16Array() {

        return new Int16Array(this.original)
    }

    toInt32Array() {

        return new Int32Array(this.original)
    }

    toUint32Array() {

        return new Uint32Array(this.original)
    }

    toBigUint64() {

        return new BigUint64Array(this.original)
    }

    toBigInt64() {

        return new BigInt64Array(this.original)
    }

    toBytes():BytesArray {
        return arrayBufferToBytes(this.original)//
    }

    toByteDecimals({isSigned=false}:Omit<ToBytesConfig,'endianness'>={}):Array<number> {
        const byteDecimals =  arrayBufferToByteDecimals(this.original,{isSigned})
        return byteDecimals;
    }

}