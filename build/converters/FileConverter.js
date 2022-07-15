var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isNode } from "../utils/crossPlatform.js";
import { binaryToImage } from "../utils/image.js";
import BlobConverter from "./BlobConverter.js";
export default class FileConverter extends BlobConverter {
    constructor(original) {
        super(original);
        if (isNode)
            throw new Error('FileConvertor is available only in the browser');
    }
    /**
     * Convert a File object to an image, whose src is a Blob.
     * Optionally supply a config object with maxSize, refering to the maximal height or width(depending on the proportions).
     */
    toImage(config) {
        return __awaiter(this, void 0, void 0, function* () {
            // debugger;
            if ((config === null || config === void 0 ? void 0 : config.validateImage) !== false && !this.original.type.match(/image.*/)) {
                // debugger
                throw new Error('File supplied is not an image');
            }
            // debugger;
            return binaryToImage(this.original, config ? config : undefined);
        });
    }
}
//# sourceMappingURL=FileConverter.js.map