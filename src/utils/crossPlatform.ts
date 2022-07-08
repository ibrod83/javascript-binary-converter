var blob:typeof Blob;
// var url: typeof URL;
if (isNode()) {//In case it's Node
     //@ts-ignore 
    eval(`import('node:buffer').then(({Blob})=>blob = Blob)`)//Using eval to prevent Webpack problems with node:buffer
}else{//In case it's the browser
    blob = Blob;//
}

export function isNode(){
    return typeof window === 'undefined'
}

export function getBlobClass() {
   return blob;
}

