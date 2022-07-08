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
            return binaryToImage(this.original, config ? config : undefined);
        });
    }
    /**
     * In the browser this will return a full dataurl string. In node, the base64 portion only is returned!
     */
    toBase64() {
        if (isNode()) {
            return this.toBase64_Node();
        }
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(this.original);
        });
    }
    toBase64_Node() {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayBuffer = yield this.original.arrayBuffer();
            const uint8 = new Uint8Array(arrayBuffer);
            return Buffer.from(uint8).toString('base64'); //TODO: this might be problematic. Explore a different solution.
        });
    }
}
//# sourceMappingURL=BlobConverter.js.map