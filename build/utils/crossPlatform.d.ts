export declare function isNode(): boolean;
export declare function getBlobClass(): {
    new (blobParts?: BlobPart[] | undefined, options?: BlobPropertyBag | undefined): Blob;
    prototype: Blob;
};
