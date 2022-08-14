
export const isNode = typeof window === 'undefined'

export async function getBlobClass() {
    await Promise.resolve();
    if (!isNode) {
        return Blob as typeof Blob

    } else {
        let prom = eval(`import('node:buffer')`)
        const { Blob: BlobClass } = await prom
        return BlobClass as typeof Blob
    }
}

export function getSystemEndianness(): 'LITTLE' | 'BIG' {
    const uint16 = new Uint16Array([256])
    const uint8 = new Uint8Array(uint16.buffer);

    if (uint8[0] === 1) return 'BIG'

    return 'LITTLE'
}

