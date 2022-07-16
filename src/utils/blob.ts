import { isNode } from "./crossPlatform.js";

export function blobToBase64(blob:Blob,config:{appendDataUrl?:boolean}={appendDataUrl:false}) {
    if (isNode) {
      return blobToBase64_Node(blob)
    }
    return new Promise<string>((resolve) => {
      debugger;
      const reader = new FileReader();
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        const dataUrl = reader.result as string   
        resolve(config?.appendDataUrl ? dataUrl : dataUrl.split(',')[1])
      };
     
    });
  }

  async function blobToBase64_Node(blob:Blob) {
    const arrayBuffer = await blob.arrayBuffer()

    const uint8 = new Uint8Array(arrayBuffer);

    return Buffer.from(uint8).toString('base64');//TODO: this might be problematic. Explore a different solution.

  }