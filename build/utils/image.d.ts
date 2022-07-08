export declare function binaryToImage(binary: Blob | File, config?: {
    longestDimension: number;
}): Promise<HTMLImageElement>;
export declare function getBlobWithModifiedImageSize(binary: Blob | File, { longestDimension }: {
    longestDimension: number;
}): Promise<unknown>;
/**
 * Reduce the dimensions of an image, while maintaning its ratio.
 */
export declare function getScaledDimensions({ width: w, height: h, longestDimension }: {
    width: number;
    height: number;
    longestDimension: number;
}): {
    width: number;
    height: number;
};
export declare function imageToBlob(image: HTMLImageElement, assertDimensions?: {
    height: number;
    width: number;
}): Promise<unknown>;
export declare function createCanvas(image: HTMLImageElement, config: {
    width: number;
    height: number;
}): HTMLCanvasElement;
