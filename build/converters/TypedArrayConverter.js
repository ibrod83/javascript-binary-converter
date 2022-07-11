var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBlobClass } from '../utils/crossPlatform.js';
import { binaryToImage } from '../utils/image.js';
export default class TypedArrayConverter {
    constructor(original) {
        this.original = original;
    }
    toUint8Array() {
        return new Uint8Array(this.original);
    }
    toInt8Array() {
        return new Int8Array(this.original);
    }
    toInt16Array() {
        const int16 = new Int16Array(this.original);
        return int16;
    }
    toUint16Array() {
        const uint16 = new Uint16Array(this.original);
        return uint16;
    }
    toInt32Array() {
        return new Int32Array(this.original);
    }
    toUint32Array() {
        return new Uint32Array(this.original);
    }
    toText() {
        const decoder = new TextDecoder();
        return decoder.decode(this.original);
    }
    toBlob() {
        const BlobClass = getBlobClass();
        return new BlobClass([this.original]);
    }
    toImage(config) {
        return __awaiter(this, void 0, void 0, function* () {
            return binaryToImage(this.toBlob(), config && config);
        });
    }
}
//# sourceMappingURL=TypedArrayConverter.js.map