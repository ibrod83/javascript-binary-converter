import { isNode } from "../utils/crossPlatform.js";
import { binaryToImage } from "../utils/image.js";
import BlobConverter from "./BlobConverter.js";

export default class FileConverter extends BlobConverter {

    constructor(original: File) {
        super(original)
        
        if (isNode)
            throw new Error('FileConvertor is available only in the browser')
    }

    /**
     * Convert a File object to an image, whose src is a Blob.
     * Optionally supply a config object with longestDimension, refering to the maximal height or width(depending on the proportions).
     */
    async toImage(config?: { longestDimension: number, validateImage?: boolean }) {
        // debugger;
        if (config?.validateImage !== false && !this.original.type.match(/image.*/)) {
            // debugger
            throw new Error('File supplied is not an image')
        }

        return binaryToImage(this.original, config ? config : undefined)
    }

}