export interface ImageCreationConfig {
    maxSize?: number
    type?: 'image/png' | 'image/jpeg'
}

export interface BlobCreationConfig{
    type?:"string"//a MIME type
}


export interface ToBytesConfig  {
    endianness?: 'LITTLE' | 'BIG' ,
    isSigned?:boolean
}

export interface FloatConversionConfig{
    precision?:'SINGLE'|'DOUBLE'
}

export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | BigInt64Array | BigUint64Array

export type BytesArray  = Array<string> 

export type DecimalBytesArray = Array<number>

