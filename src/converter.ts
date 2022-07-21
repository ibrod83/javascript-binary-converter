import BlobConverter from "./converters/BlobConverter.js";
import TypedArrayConverter from "./converters/TypedArrayConverter.js";
import FileConverter from "./converters/FileConverter.js";
import ArrayBufferConverter from "./converters/ArrayBufferConverter.js";
import { isNode } from "./utils/crossPlatform.js";
import ImageConverter from "./converters/ImageConverter.js";



type TypedArray = Int8Array | Uint8Array
type Convertable = TypedArray | Blob | File | ArrayBuffer | HTMLImageElement;//Types supported.


/**
 * A generic converter function. Pass any of the convertable object types, to get their relevant conversion methods. 
 */
function converter(original: TypedArray): TypedArrayConverter
function converter(original: File): FileConverter
function converter(original: Blob): BlobConverter
function converter(original: ArrayBuffer): ArrayBufferConverter
function converter(original: HTMLImageElement): ImageConverter


function converter(original: Convertable) {
    if(isNode && original.constructor.name === 'Blob'){
       throw new Error('In order to convert a Blob in Node, import BlobConverter directly') 
    }

    if (original instanceof Int8Array || original instanceof Uint8Array) return new TypedArrayConverter(original)    

    if (!isNode) {
        if (original instanceof File) return new FileConverter(original as File)

        if (original instanceof HTMLImageElement) return new ImageConverter(original)     
        
        if ( original instanceof Blob ) return new BlobConverter(original as Blob)
    }      

    if (original instanceof ArrayBuffer) return new ArrayBufferConverter(original)
}

export default converter;