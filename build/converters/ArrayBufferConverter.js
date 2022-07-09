var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { binaryToImage } from "../utils/image.js";
export default class ArrayBufferConverter {
    constructor(original) {
        this.original = original;
    } //
    toImage({ type = 'image/jpeg', longestDimension = undefined } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const uint8 = new Uint8Array(this.original);
            const blob = new Blob([uint8], { type });
            const image = longestDimension ? yield binaryToImage(blob, { longestDimension }) : yield binaryToImage(blob);
            return image;
        });
    }
    toUint8Array() {
        return new Uint8Array(this.original);
    }
    toInt8Array() {
        return new Int8Array(this.original);
    }
    toUint16Array() {
        return new Uint16Array(this.original);
    }
    toInt16Array() {
        return new Int16Array(this.original);
    }
    toInt32Array() {
        return new Int32Array(this.original);
    }
    toUint32Array() {
        return new Uint32Array(this.original);
    }
}
//# sourceMappingURL=ArrayBufferConverter.js.map