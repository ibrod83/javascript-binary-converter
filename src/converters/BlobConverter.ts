import { blobToBase64 } from "../utils/blob.js";
import * as blobUtils from "../utils/image.js";


export default class BlobConverter {

  protected original!: Blob

  constructor(original: Blob) {
    this.original = original;
  }

  async toUint8Array() {
    const arrayBuffer = await this.toArrayBuffer();
    return new Uint8Array(arrayBuffer)
  }

  async toInt8Array() {
    const arrayBuffer = await this.toArrayBuffer();
    return new Int8Array(arrayBuffer)
  }

  async toArrayBuffer() {
    return await this.original.arrayBuffer()

  }

  async toImage(config?: { maxSize?: number,format?:string }) {
    return blobUtils.binaryToImage(this.original, config ? config : undefined)//

  }

  /**
   * Returns a base64 string. If you want a dataUrl appended to it, pass {appendDataUrl:true}
   * In Node will always return plain base64
   */
  toBase64(config:{appendDataUrl?:boolean}={appendDataUrl:false}) {
    return blobToBase64(this.original,config)
  }


}