import { ImageCreationConfig } from "../sharedTypes";
import { isNode } from "../utils/crossPlatform";
import { binaryToImage } from "../utils/image";
import BlobConverter from "./BlobConverter";


type ToImageConfig = Required<Pick<ImageCreationConfig,'maxSize'>> & {
    validateImage?:boolean
}
export default class FileConverter extends BlobConverter {

    constructor(original: File) {
        super(original)
        
        if (isNode)
            throw new Error('FileConvertor is available only in the browser')
    }

    /**
     * Convert a File object to an image, whose src is a Blob.
     * Optionally supply a config object with maxSize, refering to the maximal height or width(depending on the proportions).
     */
    async toImage(config?:ToImageConfig) {
        if (config?.validateImage !== false && !this.original.type.match(/image.*/)) {
            throw new Error('File supplied is not an image')
        }
        return binaryToImage(this.original, config ? config : undefined)
    }

}