import { binaryToImage } from "../utils/image.js";

export default class ArrayBufferConverter{

    constructor(private original:ArrayBuffer){}//

    async toImage({ type= 'image/jpeg',longestDimension=undefined }: {type?:string,longestDimension?:number } = {}){
        const uint8 = new Uint8Array(this.original)
        const blob = new Blob([uint8],{type})
        const image = longestDimension  ? await binaryToImage(blob,{longestDimension}) :  await binaryToImage(blob)    
        return image;
    }

    toUint8Array(){

        return new Uint8Array(this.original)
    }

    toInt8Array(){

        return new Int8Array(this.original)
    }

    toUint16Array(){

        return new Uint16Array(this.original)
    }

    toInt16Array(){

        return new Int16Array(this.original)
    }

    toInt32Array(){

        return new Int32Array(this.original)
    }

    toUint32Array(){

        return new Uint32Array(this.original)
    }   

}