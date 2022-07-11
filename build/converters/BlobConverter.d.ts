export default class BlobConverter {
    protected original: Blob;
    constructor(original: Blob);
    toUint8Array(): Promise<Uint8Array>;
    toInt8Array(): Promise<Int8Array>;
    toArrayBuffer(): Promise<ArrayBuffer>;
    toImage(config?: {
        longestDimension: number;
        format?: string;
    }): Promise<HTMLImageElement>;
    /**
     * In the browser this will return a full dataurl string. In node, the base64 portion only is returned!
     */
    toBase64(): Promise<string>;
    toBase64_Node(): Promise<string>;
}
