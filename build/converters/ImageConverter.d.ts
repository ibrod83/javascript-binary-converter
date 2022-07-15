interface ImageConversionConfig {
    height?: number;
    width?: number;
}
export default class ImageConverter {
    private original;
    constructor(original: HTMLImageElement);
    toBlob(config?: ImageConversionConfig): Promise<Blob>;
    toArrayBuffer(config?: ImageConversionConfig): Promise<ArrayBuffer>;
    toUint8Array(): Promise<Uint8Array>;
    toInt8Array(): Promise<Int8Array>;
    toCanvas(config?: ImageConversionConfig): HTMLCanvasElement;
}
export {};
