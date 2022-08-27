import BlobConverter from "./converters/BlobConverter";
import TypedArrayConverter from "./converters/TypedArrayConverter";
import FileConverter from "./converters/FileConverter";
import ArrayBufferConverter from "./converters/ArrayBufferConverter";
import { isNode } from "./utils/crossPlatform";
import ImageConverter from "./converters/ImageConverter";
import { BytesArray, DecimalBytesArray, TypedArray } from "./sharedTypes";
import BytesConverter from "./converters/BytesConverter";
import DecimalBytesConverter from "./converters/DecimalBytesConverter";
import NumberConverter from "./converters/NumberConverter";
import StringConverter from "./converters/StringConverter";

type Convertable = TypedArray | Blob | File | ArrayBuffer | HTMLImageElement | BytesArray | DecimalBytesArray | number | bigint | string ;//Types supported.


/**
 * A generic converter function. Pass any of the convertable object types, to get their relevant conversion methods. 
 */
function converter(original: TypedArray): TypedArrayConverter
function converter(original: File): FileConverter
function converter(original: Blob): BlobConverter
function converter(original: ArrayBuffer): ArrayBufferConverter
function converter(original: HTMLImageElement): ImageConverter
function converter(original: DecimalBytesArray): DecimalBytesConverter
function converter(original: number | bigint): NumberConverter
function converter(original: string): StringConverter
function converter(original: BytesArray): BytesConverter


function converter(original: Convertable) {//
    if (isNode && original.constructor.name === 'Blob') {
        throw new Error('In order to convert a Blob in Node, import BlobConverter directly')
    }

    if (original instanceof Int8Array || original instanceof Uint8Array || original instanceof Uint16Array || original instanceof Int16Array || original instanceof Int32Array || original instanceof Uint32Array) return new TypedArrayConverter(original)

    if (!isNode) {
        if (original instanceof File) return new FileConverter(original as File)

        if (original instanceof HTMLImageElement) return new ImageConverter(original)

        if (original instanceof Blob) return new BlobConverter(original as Blob)
    }

    if (typeof original === 'string') {
        return new StringConverter(original)
    }

    if (original instanceof ArrayBuffer) return new ArrayBufferConverter(original)

    if (typeof original === 'number' || typeof original === 'bigint') return new NumberConverter(original)

    if (Array.isArray(original) && typeof original[0] === 'number') return new DecimalBytesConverter(original as Array<number>)

    if (Array.isArray(original) && typeof original[0] === 'string') return new BytesConverter(original as Array<string>)

    throw new Error('The argument supplied is not a convertible')
}

export default converter;