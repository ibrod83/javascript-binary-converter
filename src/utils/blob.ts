import { isNode } from "./crossPlatform.js";

export function blobToBase64(blob: Blob, config: { appendDataUrl?: boolean } = { appendDataUrl: false }) {
  if (isNode) {
    return blobToBase64_Node(blob)
  }
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      resolve(config?.appendDataUrl ? dataUrl : dataUrl.split(',')[1])
    };

  });
}

async function blobToBase64_Node(blob: Blob) {
  const arrayBuffer = await blob.arrayBuffer()

  const uint8 = new Uint8Array(arrayBuffer);

  return Buffer.from(uint8).toString('base64');//TODO: this might be problematic. Explore a different solution.

}

export async function blobToCanvas(blob: Blob) {
  var canvas = document.createElement('canvas');

  var ctx = canvas.getContext('2d');
  var img = new Image();

  img.src = URL.createObjectURL(blob);

  await new Promise<Event>((res) => img.onload = res);
  canvas.height = img.height;
  canvas.width = img.width
  ctx!.drawImage(img, 0, 0, img.width, img.height);
  return canvas;
  
}