
export async function binaryToImage(binary: Blob | File, config?: { longestDimension: number }) {
    // debugger
    let finalBinary!: Blob | File;
    if (config?.longestDimension) {
        finalBinary = await getBlobWithModifiedImageSize(binary, { longestDimension: config.longestDimension }) as Blob | File;
    } else {
        finalBinary = binary
    }
    const image = new Image()
    image.src = URL.createObjectURL(finalBinary)
    await new Promise<Event>((res) => image.onload = res);

    return image;

}

export async function getBlobWithModifiedImageSize(binary: Blob | File, { longestDimension }: { longestDimension: number }) {

    const image = new Image();

    image.src = URL.createObjectURL(binary);

    await new Promise<Event>((res) => image.onload = res);

    const deducedDimensions = getScaledDimensions({ width: image.width, height: image.height, longestDimension })

    const blob = await imageToBlob(image, deducedDimensions)

    return blob;
}


/**
 * Reduce the dimensions of an image, while maintaning its ratio. 
 */
export function getScaledDimensions({ width: w, height: h, longestDimension }: { width: number, height: number, longestDimension: number }) {
    let width = w
    let height = h
    if (width > height) {
        if (width > longestDimension) {
            height *= longestDimension / width;
            width = longestDimension;
        }
    } else {
        if (height > longestDimension) {
            width *= longestDimension / height;
            height = longestDimension;
        }
    }

    return { width, height }
}

export async function imageToBlob(image: HTMLImageElement, assertDimensions?: { height: number, width: number }) {
   
    const height = assertDimensions?.height || image.height   
    const width = assertDimensions?.width || image.width
   
    const canvas = createCanvas(image,{height,width})
   
    return new Promise((res) => canvas.toBlob(res));
}


export function createCanvas(image:HTMLImageElement,config:{width:number,height:number}){
    
    const canvas = document.createElement("canvas");//Create a canvas, in order to get Blob from the original image.
   
    canvas.width = config.width    
    canvas.height = config.height
   
    canvas.getContext('2d')!.drawImage(image, 0, 0, config.width, config.height);
   
    return canvas;
}