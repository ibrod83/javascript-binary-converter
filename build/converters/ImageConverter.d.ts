export default class ImageConverter {
    private original;
    constructor(original: HTMLImageElement);
    toBlob(config?: {
        assertDimensions: {
            height: number;
            width: number;
        };
    }): Promise<Blob>;
    toUint8Array(): Promise<Uint8Array>;
}
