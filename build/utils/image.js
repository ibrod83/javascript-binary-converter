var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function binaryToImage(binary, config) {
    return __awaiter(this, void 0, void 0, function* () {
        // debugger
        let finalBinary;
        if (config === null || config === void 0 ? void 0 : config.maxSize) {
            finalBinary = (yield getBlobWithModifiedImageSize(binary, { maxSize: config.maxSize }));
        }
        else {
            finalBinary = binary;
        }
        const image = new Image();
        image.src = URL.createObjectURL(finalBinary);
        yield new Promise((res) => image.onload = res);
        return image;
    });
}
export function getBlobWithModifiedImageSize(binary, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const image = new Image();
        image.src = URL.createObjectURL(binary);
        yield new Promise((res) => image.onload = res);
        const deducedDimensions = getScaledDimensions({ width: image.width, height: image.height, maxSize: config.maxSize });
        // debugger;
        const blob = yield imageToBlob(image, deducedDimensions);
        return blob;
    });
}
/**
 * Reduce the dimensions of an image, while maintaning its ratio.
 */
export function getScaledDimensions({ width: w, height: h, maxSize }) {
    let width = w;
    let height = h;
    if (width > height) {
        if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
        }
    }
    else {
        if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
        }
    }
    return { width, height };
}
export function imageToBlob(image, config) {
    return __awaiter(this, void 0, void 0, function* () {
        // debugger
        const height = (config === null || config === void 0 ? void 0 : config.height) || image.height;
        const width = (config === null || config === void 0 ? void 0 : config.width) || image.width;
        const type = (config === null || config === void 0 ? void 0 : config.type) || 'image/png';
        const canvas = imageToCanvas(image, { height, width });
        const blob = yield new Promise((res) => canvas.toBlob(res, type));
        // debugger;
        return blob;
    });
}
export function imageToCanvas(image, config) {
    const canvas = document.createElement("canvas"); //Create a canvas, in order to get Blob from the original image.
    canvas.width = config.width;
    canvas.height = config.height;
    canvas.getContext('2d').drawImage(image, 0, 0, config.width, config.height);
    return canvas;
}
//# sourceMappingURL=image.js.map