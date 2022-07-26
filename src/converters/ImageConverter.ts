import { BytesArray } from "../sharedTypes.js";
import { appendZeros, decimalToBinary, uint8ToBytes } from "../utils/binary.js";
import { isNode } from "../utils/crossPlatform.js";
import { binaryToImage, imageToBlob, imageToCanvas } from "../utils/image.js";


interface ImageConversionConfig {
    height?: number
    width?: number
}
export default class ImageConverter {

    constructor(private original: HTMLImageElement) {
        if (isNode) {
            throw new Error('ImageConvertor is available only in the browser');
        }
    }

    async toBlob(config?: ImageConversionConfig) {
        return imageToBlob(this.original, { height: config?.height, width: config?.width }) as Promise<Blob>
    }

    async toArrayBuffer(config?: ImageConversionConfig) {
        const blob = await this.toBlob(config)
        return blob.arrayBuffer()
    }

    async toUint8Array() {
        return new Uint8Array(await this.toArrayBuffer());//
    }

    async toInt8Array() {

        return new Int8Array(await this.toArrayBuffer());
    }

    /**
     * Returns an array of number-like strings, each representing 8 bits.
     */
    async toBytes():Promise<BytesArray> {
        const uint8 = await this.toUint8Array()
        const bytes = uint8ToBytes(uint8)
        return bytes
    }

    toCanvas(config?: ImageConversionConfig) {
        const w = config?.width || this.original.width
        const h = config?.height || this.original.height
        const canvas = imageToCanvas(this.original, { width: w, height: h })
        return canvas;
    }

}
