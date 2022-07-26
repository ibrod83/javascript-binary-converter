import { BlobCreationConfig, BytesArray, ImageCreationConfig, TypedArray } from "../sharedTypes.js"
import { binaryToDecimal, groupBytes, typedArrayToDecimals } from "../utils/binary.js"
import { getBlobClass } from "../utils/crossPlatform.js"
import { binaryToImage } from "../utils/image.js"



export default class BytesConverter {

    constructor(private original: BytesArray) {
        if (!original.every(byte => byte.length === 8)) {
            throw new Error('Each element must be a "byte" - a string of 8 characters')
        }
    }

    toUint8Array() {
        // return new Uint8Array(this.original)
        return new Uint8Array(this.original.map(binary => binaryToDecimal(binary)))

    }

    toInt8Array() {
        return new Int8Array(this.original.map(binary => binaryToDecimal(binary, true)))
    }

    toInt16Array() {
        const normalizedBytes = groupBytes(this.original, 2)
        return new Int16Array(normalizedBytes.map(binary => binaryToDecimal(binary, true)))
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


}