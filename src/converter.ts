import BlobConverter from "./converters/BlobConverter.js";
import TypedArrayConverter from "./converters/TypedArrayConverter.js";
import FileConverter from "./converters/FileConverter.js";
import ArrayBufferConverter from "./converters/ArrayBufferConverter.js";

type TypedArray = Int8Array | Uint8Array 
type Convertable = TypedArray | Blob | File | ArrayBuffer ;//Types supported.

/**
 * A generic converter function. Pass any of the convertable object types, to get their relevant conversion methods. 
 */
function converter(original:TypedArray):TypedArrayConverter
function converter(original:File):FileConverter
function converter(original:Blob):BlobConverter
function converter(original:ArrayBuffer):ArrayBufferConverter


function converter(original:Convertable){
    if(original instanceof Int8Array || original instanceof Uint8Array)return new TypedArrayConverter(original)
  
    if(original.constructor.name ===  'File')return  new FileConverter(original as File)

    if(original instanceof Blob)return  new BlobConverter(original)

    if(original instanceof ArrayBuffer)return  new ArrayBufferConverter(original)

 

}

export default converter;