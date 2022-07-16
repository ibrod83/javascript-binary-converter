import { isNode } from "../utils/crossPlatform";
import { binaryToImage, imageToBlob, imageToCanvas } from "../utils/image";


interface ImageConversionConfig{
    height?:number
    width?:number
}
export default class ImageConverter {

    constructor(private original: HTMLImageElement) {
        if(isNode){
            throw new Error('ImageConvertor is available only in the browser');
        }
    }

    async toBlob(config?:ImageConversionConfig){
        return imageToBlob(this.original, {height:config?.height,width:config?.width} ) as Promise<Blob>
    }

    async toArrayBuffer(config?:ImageConversionConfig){
        const blob = await this.toBlob(config)
        return blob.arrayBuffer()
    }

    async toUint8Array(){
        return new Uint8Array(await this.toArrayBuffer());//
    }

    async toInt8Array(){
        
        return new Int8Array(await this.toArrayBuffer());
    }   

    toCanvas(config?:ImageConversionConfig){
        const w = config?.width || this.original.width
        const h = config?.height || this.original.height
        const canvas = imageToCanvas(this.original,{width:w,height:h})
        return canvas;
    }

}