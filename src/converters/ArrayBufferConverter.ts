import { BlobCreationConfig, BytesArray, ImageCreationConfig } from "../sharedTypes";
import { uint8ToBytes } from "../utils/binary";
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

    toBytes():BytesArray {
        const uint8 = this.toUint8Array()
        return uint8ToBytes(uint8)
    }

}