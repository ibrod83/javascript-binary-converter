
export const isNode = typeof window === 'undefined'

export async function getBlobClass() {
    await Promise.resolve();
    if(!isNode){
        return Blob as typeof Blob
      
    }else{
        let prom= eval(`import('node:buffer')`)
        const {Blob:BlobClass} = await prom
         return BlobClass as typeof Blob
    }
}

