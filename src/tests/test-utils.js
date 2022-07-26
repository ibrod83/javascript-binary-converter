import { imageToCanvas } from "../../build/dev/utils/image.js";

/**
 * 
 * @param {string} imageQuerySelector 
 * @returns {Promise<{imageFromDom:HTMLImageElement,blob:Blob,file:File}>}
 */
export async function createObjectsForFileDummyTests(imageQuerySelector) {
    const imageFromDom = document.querySelector(imageQuerySelector)//Take the original hidden image from the DOM.

    const canvas = imageToCanvas(imageFromDom, { width: imageFromDom.width, height: imageFromDom.height })

    const blob = await new Promise((res) => canvas.toBlob(res));//Create a Blob from the canvas.

    const file = new File([blob], 'Koala.jpg')//Create a file object, passing the Blob as the binary data.

    return {
        imageFromDom,
        blob,
        file
    }
}

export function mockExpect(expression) {

    const expected = chai.expect(expression)
    expected.toBe = expected.to.equal

    return expected
}