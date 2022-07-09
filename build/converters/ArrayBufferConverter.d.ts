export default class ArrayBufferConverter {
    private original;
    constructor(original: ArrayBuffer);
    toImage({ type, longestDimension }?: {
        type?: string;
        longestDimension?: number;
    }): Promise<HTMLImageElement>;
    toUint8Array(): Uint8Array;
    toInt8Array(): Int8Array;
    toUint16Array(): Uint16Array;
    toInt16Array(): Int16Array;
    toInt32Array(): Int32Array;
    toUint32Array(): Uint32Array;
}
