var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isNode } from "./crossPlatform.js";
export function blobToBase64(blob, config = { appendDataUrl: false }) {
    if (isNode) {
        return blobToBase64_Node(blob);
    }
    return new Promise((resolve) => {
        debugger;
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const dataUrl = reader.result;
            resolve((config === null || config === void 0 ? void 0 : config.appendDataUrl) ? dataUrl : dataUrl.split(',')[1]);
        };
    });
}
function blobToBase64_Node(blob) {
    return __awaiter(this, void 0, void 0, function* () {
        const arrayBuffer = yield blob.arrayBuffer();
        const uint8 = new Uint8Array(arrayBuffer);
        return Buffer.from(uint8).toString('base64'); //TODO: this might be problematic. Explore a different solution.
    });
}
//# sourceMappingURL=blob.js.map