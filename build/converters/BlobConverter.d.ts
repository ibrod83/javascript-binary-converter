export default class BlobConverter {
    protected original: Blob;
    constructor(original: Blob);
    toUint8Array(): Promise<Uint8Array>;
    toInt8Array(): Promise<Int8Array>;
    toArrayBuffer(): Promise<ArrayBuffer>;
    toImage(config?: {
        maxSize: number;
        format?: string;
    }): Promise<HTMLImageElement>;
    /**
     * Returns a base64 string. If you want a dataUrl appended to it, pass {appendDataUrl:true}
     * In Node will always return plain base64
     */
    toBase64(config?: {
        appendDataUrl?: boolean;
    }): Promise<string>;
}
