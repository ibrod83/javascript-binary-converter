import BlobConverter from "./converters/BlobConverter.js";
import TypedArrayConverter from "./converters/TypedArrayConverter.js";
import FileConverter from "./converters/FileConverter.js";
import ArrayBufferConverter from "./converters/ArrayBufferConverter.js";
import { getBlobClass, isNode } from "./utils/crossPlatform.js";
import ImageConverter from "./converters/ImageConverter.js";
function converter(original) {
    if (original instanceof Int8Array || original instanceof Uint8Array)
        return new TypedArrayConverter(original);
    if (!isNode) {
        if (original instanceof File)
            return new FileConverter(original);
        // debugger;
        if (original instanceof HTMLImageElement)
            return new ImageConverter(original);
    }
    if (original instanceof getBlobClass())
        return new BlobConverter(original);
    if (original instanceof ArrayBuffer)
        return new ArrayBufferConverter(original);
}
export default converter;
//# sourceMappingURL=converter.js.map