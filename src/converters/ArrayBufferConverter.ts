import { binaryToImage } from "../utils/image.js";

export default class ArrayBufferConverter{

    constructor(private original:ArrayBuffer){}//

    async toImage(){
        const uint8 = new Uint8Array(this.original)
        const blob = new Blob([uint8],{type:'image/jpeg'})
        debugger;
        const image = await binaryToImage(blob)
     
        return image;
    }

}