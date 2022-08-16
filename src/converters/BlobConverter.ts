import { BytesArray, ImageCreationConfig } from "../sharedTypes";
import { typedArrayToBytes } from "../utils/binary";
import { blobToBase64, blobToCanvas } from "../utils/blob";
import * as blobUtils from "../utils/image";


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

  async toImage(config?: ImageCreationConfig) {
    return blobUtils.binaryToImage(this.original, config ? config : undefined)//

  }

  async toCanvas(){
    return blobToCanvas(this.original)
  }

  async toBytes():Promise<BytesArray>{
    const uint8 = await this.toUint8Array()
    return typedArrayToBytes(uint8)
  }

  /**
   * Returns a base64 string. If you want a dataUrl appended to it, pass {appendDataUrl:true}
   * In Node will always return plain base64
   */
  toBase64(config:{appendDataUrl?:boolean}={appendDataUrl:false}) {
    return blobToBase64(this.original,config)
  }


}