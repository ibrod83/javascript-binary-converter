var blob;
export const isNode = typeof window === 'undefined';
if (isNode) { //In case it's Node
    //@ts-ignore 
    eval(`import('node:buffer').then(({Blob})=>blob = Blob)`); //Using eval to prevent Webpack problems with node:buffer
}
else { //In case it's the browser
    blob = Blob; //
}
export function getBlobClass() {
    return blob;
}
//# sourceMappingURL=crossPlatform.js.map