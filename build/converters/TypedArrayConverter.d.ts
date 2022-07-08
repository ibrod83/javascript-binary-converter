declare type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array;
export default class TypedArrayConverter {
    private original;
    constructor(original: TypedArray);
    toUint8Array(): Uint8Array;
    toInt8Array(): Int8Array;
    toInt16Array(): Int16Array;
    toUint16Array(): Uint16Array;
    toInt32Array(): Int32Array;
    toUint32Array(): Uint32Array;
    toText(): string;
    toBlob(): Blob;
}
export {};
