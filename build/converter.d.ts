import BlobConverter from "./converters/BlobConverter.js";
import TypedArrayConverter from "./converters/TypedArrayConverter.js";
import FileConverter from "./converters/FileConverter.js";
import ArrayBufferConverter from "./converters/ArrayBufferConverter.js";
declare type TypedArray = Int8Array | Uint8Array;
/**
 * A generic converter function. Pass any of the convertable object types, to get their relevant conversion methods.
 */
declare function converter(original: TypedArray): TypedArrayConverter;
declare function converter(original: File): FileConverter;
declare function converter(original: Blob): BlobConverter;
declare function converter(original: ArrayBuffer): ArrayBufferConverter;
export default converter;
