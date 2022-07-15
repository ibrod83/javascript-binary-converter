declare type ImageTypes = 'image/png' | 'image/jpeg';
declare type ImageToBlobConfig = {
    type?: ImageTypes;
    height?: number;
    width?: number;
};
interface ImageCreationConfig {
    maxSize: number;
    type: 'image/png' | 'image/jpeg';
}
declare type ScaledDimensionsConfig = Pick<ImageCreationConfig, 'maxSize'> & Dimensions;
declare type Dimensions = {
    width: number;
    height: number;
};
declare type PartialImageCreationConfig = Partial<ImageCreationConfig>;
export declare function binaryToImage(binary: Blob | File, config?: PartialImageCreationConfig): Promise<HTMLImageElement>;
export declare function getBlobWithModifiedImageSize(binary: Blob | File, config: Required<Omit<PartialImageCreationConfig, 'type'>>): Promise<unknown>;
/**
 * Reduce the dimensions of an image, while maintaning its ratio.
 */
export declare function getScaledDimensions({ width: w, height: h, maxSize }: ScaledDimensionsConfig): {
    width: number;
    height: number;
};
export declare function imageToBlob(image: HTMLImageElement, config: ImageToBlobConfig): Promise<unknown>;
export declare function imageToCanvas(image: HTMLImageElement, config: Dimensions): HTMLCanvasElement;
export {};
