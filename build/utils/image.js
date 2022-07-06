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
        if (config === null || config === void 0 ? void 0 : config.longestDimension) {
            finalBinary = (yield getBlobWithModifiedImageSize(binary, { longestDimension: config.longestDimension }));
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
export function getBlobWithModifiedImageSize(binary, { longestDimension }) {
    return __awaiter(this, void 0, void 0, function* () {
        const image = new Image();
        image.src = URL.createObjectURL(binary);
        yield new Promise((res) => image.onload = res);
        const deducedDimensions = getScaledDimensions({ width: image.width, height: image.height, longestDimension });
        const blob = yield imageToBlob(image, deducedDimensions);
        return blob;
    });
}
/**
 * Reduce the dimensions of an image, while maintaning its ratio.
 */
export function getScaledDimensions({ width: w, height: h, longestDimension }) {
    let width = w;
    let height = h;
    if (width > height) {
        if (width > longestDimension) {
            height *= longestDimension / width;
            width = longestDimension;
        }
    }
    else {
        if (height > longestDimension) {
            width *= longestDimension / height;
            height = longestDimension;
        }
    }
    return { width, height };
}
export function imageToBlob(image, assertDimensions) {
    return __awaiter(this, void 0, void 0, function* () {
        const height = (assertDimensions === null || assertDimensions === void 0 ? void 0 : assertDimensions.height) || image.height;
        const width = (assertDimensions === null || assertDimensions === void 0 ? void 0 : assertDimensions.width) || image.width;
        const canvas = createCanvas(image, { height, width });
        return new Promise((res) => canvas.toBlob(res));
    });
}
export function createCanvas(image, config) {
    const canvas = document.createElement("canvas"); //Create a canvas, in order to get Blob from the original image.
    canvas.width = config.width;
    canvas.height = config.height;
    canvas.getContext('2d').drawImage(image, 0, 0, config.width, config.height);
    return canvas;
}
//# sourceMappingURL=image.js.map