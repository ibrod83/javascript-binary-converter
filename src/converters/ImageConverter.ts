import { isNode } from "../utils/crossPlatform.js";
import { binaryToImage, imageToBlob } from "../utils/image.js";

export default class ImageConverter {

    constructor(private original: HTMLImageElement) {
        if(isNode){
            throw new Error('ImageConvertor is available only in the browser');
        }
    }

    async toBlob(config?:{assertDimensions:{height:number,width:number}}){
        const assertDimensions = config?.assertDimensions
        return imageToBlob(this.original, assertDimensions && assertDimensions ) as Promise<Blob>
    }

    async toUint8Array(){
        const blob  = await this.toBlob();
        const arrayBuffer = await blob.arrayBuffer()
        return new Uint8Array(arrayBuffer);
    }

}