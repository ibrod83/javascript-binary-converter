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
import { imageToBlob } from "../utils/image.js";
export default class ImageConverter {
    constructor(original) {
        this.original = original;
        if (isNode) {
            throw new Error('ImageConvertor is available only in the browser');
        }
    }
    toBlob(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const assertDimensions = config === null || config === void 0 ? void 0 : config.assertDimensions;
            return imageToBlob(this.original, assertDimensions && assertDimensions);
        });
    }
    toUint8Array() {
        return __awaiter(this, void 0, void 0, function* () {
            const blob = yield this.toBlob();
            const arrayBuffer = yield blob.arrayBuffer();
            return new Uint8Array(arrayBuffer);
        });
    }
}
//# sourceMappingURL=ImageConverter.js.map