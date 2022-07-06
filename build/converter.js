import BlobConverter from "./converters/BlobConverter.js";
import TypedArrayConverter from "./converters/TypedArrayConverter.js";
import FileConverter from "./converters/FileConverter.js";
function converter(original) {
    if (original instanceof Int8Array || original instanceof Uint8Array)
        return new TypedArrayConverter(original);
    if (original.constructor.name === 'File')
        return new FileConverter(original);
    if (original.constructor.name === 'Blob')
        return new BlobConverter(original);
}
export default converter;
//# sourceMappingURL=converter.js.map