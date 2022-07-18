import { ImageCreationConfig } from "../sharedTypes"

type ImageTypes = 'image/png' | 'image/jpeg'


type ImageToBlobConfig = {
    type?: ImageTypes
    height?: number
    width?: number
}

type ScaledDimensionsConfig = Required<Pick<ImageCreationConfig,'maxSize'>> & Dimensions

type Dimensions = {
    width: number
    height: number
}


export async function binaryToImage(binary: Blob | File, config?: ImageCreationConfig) {

    let finalBinary!: Blob | File;
    if (config?.maxSize) {
        finalBinary = await getBlobWithModifiedImageSize(binary, { maxSize: config.maxSize as number }) as Blob | File;
    } else {
        finalBinary = binary
    }
    const image = new Image()
    image.src = URL.createObjectURL(finalBinary)
    await new Promise<Event>((res) => image.onload = res);

    return image;

}

export async function getBlobWithModifiedImageSize(binary: Blob | File, config: Required<Omit<ImageCreationConfig, 'type'>>) {

    const image = new Image();

    image.src = URL.createObjectURL(binary);

    await new Promise<Event>((res) => image.onload = res);

    const deducedDimensions = getScaledDimensions({ width: image.width, height: image.height, maxSize: config.maxSize })
    // debugger;
    const blob = await imageToBlob(image, deducedDimensions)

    return blob;
}


/**
 * Reduce the dimensions of an image, while maintaning its ratio.
 */
export function getScaledDimensions({ width: w, height: h, maxSize }: ScaledDimensionsConfig) {
    let width = w
    let height = h
    if (width > height) {
        if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
        }
    } else {
        if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
        }
    }

    return { width, height }
}

export async function imageToBlob(image: HTMLImageElement, config: ImageToBlobConfig) {
    // debugger

    const height = config?.height || image.height
    const width = config?.width || image.width
    const type = config?.type || 'image/png'
    const canvas = imageToCanvas(image, { height, width })
    const blob = await new Promise((res) => canvas.toBlob(res, type));

    // debugger;
    return blob
}


export function imageToCanvas(image: HTMLImageElement, config: Dimensions) {//

    const canvas = document.createElement("canvas");//Create a canvas, in order to get Blob from the original image.

    canvas.width = config.width
    canvas.height = config.height

    canvas.getContext('2d')!.drawImage(image, 0, 0, config.width, config.height);

    return canvas;
}