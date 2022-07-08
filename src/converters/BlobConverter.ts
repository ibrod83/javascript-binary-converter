import { isNode } from "../utils/crossPlatform.js";
import { binaryToImage } from "../utils/image.js";


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

  async toImage(config?: { longestDimension: number }) {

    return binaryToImage(this.original, config ? config : undefined)

  }

  /**
   * In the browser this will return a full dataurl string. In node, the base64 portion only is returned!
   */
  toBase64() {
    if (isNode()) {
      return this.toBase64_Node()
    }
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(this.original);
    });
  }




  async toBase64_Node() {
    const arrayBuffer = await this.original.arrayBuffer()

    const uint8 = new Uint8Array(arrayBuffer);

    return Buffer.from(uint8).toString('base64');//TODO: this might be problematic. Explore a different solution.

  }
}