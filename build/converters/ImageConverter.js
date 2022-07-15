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
import { imageToBlob, imageToCanvas } from "../utils/image.js";
export default class ImageConverter {
    constructor(original) {
        this.original = original;
        if (isNode) {
            throw new Error('ImageConvertor is available only in the browser');
        }
    }
    toBlob(config) {
        return __awaiter(this, void 0, void 0, function* () {
            return imageToBlob(this.original, { height: config === null || config === void 0 ? void 0 : config.height, width: config === null || config === void 0 ? void 0 : config.width });
        });
    }
    toArrayBuffer(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const blob = yield this.toBlob(config);
            return blob.arrayBuffer();
        });
    }
    toUint8Array() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Uint8Array(yield this.toArrayBuffer());
        });
    }
    toInt8Array() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Int8Array(yield this.toArrayBuffer());
        });
    }
    toCanvas(config) {
        const w = (config === null || config === void 0 ? void 0 : config.width) || this.original.width;
        const h = (config === null || config === void 0 ? void 0 : config.height) || this.original.height;
        const canvas = imageToCanvas(this.original, { width: w, height: h });
        return canvas;
    }
}
//# sourceMappingURL=ImageConverter.js.map