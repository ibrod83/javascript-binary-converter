var blob;
// var url: typeof URL;
if (isNode()) { //In case it's Node
    //@ts-ignore
    import('node:buffer').then(({ Blob }) => blob = Blob);
}
else { //In case it's the browser
    blob = Blob;
}
export function isNode() {
    return typeof window === 'undefined';
}
export function getBlobClass() {
    return blob;
}
//# sourceMappingURL=crossPlatform.js.map