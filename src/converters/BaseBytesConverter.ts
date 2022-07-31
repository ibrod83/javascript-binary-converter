import { BlobCreationConfig, BytesArray, DecimalBytesArray, ImageCreationConfig } from "../sharedTypes.js"
import { getBlobClass } from "../utils/crossPlatform.js"
import { binaryToImage } from "../utils/image.js"

export abstract class BaseBytesConverter{

    constructor(protected original: BytesArray | DecimalBytesArray) {}

    abstract toUint8Array():Uint8Array

    
    toText() {
        const uint8 = this.toUint8Array()

        const decoder = new TextDecoder()
        return decoder.decode(uint8)
    }


    async toBlob(config?: BlobCreationConfig): Promise<Blob> {
        const BlobClass = await getBlobClass()
        return new BlobClass([this.toUint8Array()], config)
    }

    async toImage(config?: ImageCreationConfig) {
        const BlobClass = await getBlobClass()
        const blob = new BlobClass([this.toUint8Array()])
        return binaryToImage(blob, config && config)
    }
}