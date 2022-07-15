import BlobConverter from "./BlobConverter.js";
export default class FileConverter extends BlobConverter {
    constructor(original: File);
    /**
     * Convert a File object to an image, whose src is a Blob.
     * Optionally supply a config object with maxSize, refering to the maximal height or width(depending on the proportions).
     */
    toImage(config?: {
        maxSize: number;
        validateImage?: boolean;
    }): Promise<HTMLImageElement>;
}
