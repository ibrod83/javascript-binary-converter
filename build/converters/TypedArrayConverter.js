import { getBlobClass } from '../utils/crossPlatform.js';
export default class TypedArrayConverter {
    constructor(original) {
        this.original = original;
        // debugger
    }
    toUint8Array() {
        // debugger
        return new Uint8Array(this.original); //
    }
    toInt8Array() {
        return new Int8Array(this.original);
    }
    toInt16Array() {
        const int16 = new Int16Array(this.original); //
        return int16;
    }
    toUint16Array() {
        // debugger;
        const uint16 = new Uint16Array(this.original); //
        return uint16;
    }
    toInt32Array() {
        return new Int32Array(this.original);
    }
    toUint32Array() {
        return new Uint32Array(this.original);
    }
    toText() {
        const decoder = new TextDecoder();
        return decoder.decode(this.original);
    }
    toBlob() {
        const BlobClass = getBlobClass();
        return new BlobClass([this.original]);
    }
}
//# sourceMappingURL=TypedArrayConverter.js.map