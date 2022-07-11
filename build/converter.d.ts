import BlobConverter from "./converters/BlobConverter.js";
import TypedArrayConverter from "./converters/TypedArrayConverter.js";
import FileConverter from "./converters/FileConverter.js";
import ArrayBufferConverter from "./converters/ArrayBufferConverter.js";
import ImageConverter from "./converters/ImageConverter.js";
declare type TypedArray = Int8Array | Uint8Array;
/**
 * A generic converter function. Pass any of the convertable object types, to get their relevant conversion methods.
 */
declare function converter(original: TypedArray): TypedArrayConverter;
declare function converter(original: File): FileConverter;
declare function converter(original: Blob): BlobConverter;
declare function converter(original: ArrayBuffer): ArrayBufferConverter;
declare function converter(original: HTMLImageElement): ImageConverter;
export default converter;
