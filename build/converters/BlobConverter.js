var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { blobToBase64 } from "../utils/blob.js";
import * as blobUtils from "../utils/image.js";
export default class BlobConverter {
    constructor(original) {
        this.original = original;
    }
    toUint8Array() {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayBuffer = yield this.toArrayBuffer();
            return new Uint8Array(arrayBuffer);
        });
    }
    toInt8Array() {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayBuffer = yield this.toArrayBuffer();
            return new Int8Array(arrayBuffer);
        });
    }
    toArrayBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.original.arrayBuffer();
        });
    }
    toImage(config) {
        return __awaiter(this, void 0, void 0, function* () {
            return blobUtils.binaryToImage(this.original, config ? config : undefined);
        });
    }
    /**
     * Returns a base64 string. If you want a dataUrl appended to it, pass {appendDataUrl:true}
     * In Node will always return plain base64
     */
    toBase64(config = { appendDataUrl: false }) {
        return blobToBase64(this.original, config);
    }
}
//# sourceMappingURL=BlobConverter.js.map