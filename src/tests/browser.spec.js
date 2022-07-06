
var expect = chai.expect;
import converter from '../../build/converter.js'
import { createCanvas, imageToBlob } from '../../build/utils/image.js';


describe('Browser tests', () => {

    it('Should return an Int8Array, from Uint8Array', async function () {
        this.timeout(0);//
        const uint8 = new Uint8Array([206, 134])
        const int8 = converter(uint8).toInt8Array()
        expect(int8 instanceof Int8Array).to.equal(true)
        expect(new TextDecoder().decode(int8)).to.equal('Ά')

    });

    it('Should return a Uint8Array, from Int8Array', async function () {

        const int8 = new Int8Array([-50, -122])
        const uint8 = converter(int8).toUint8Array()
        expect(uint8 instanceof Uint8Array).to.equal(true)
        expect(new TextDecoder().decode(uint8)).to.equal('Ά')

    });

    it('Should return a Blob, that is converted to "Ά", from Uint8Array', async function () {

        const int8 = new Uint8Array([206, 134])
        const text = await converter(int8).toBlob().text()
        expect(text).to.equal('Ά')
    });

    it('Should return a Blob, that is converted to "Ά", from Int8Array', async function () {

        const int8 = new Int8Array([-50, -122])
        const text = await converter(int8).toBlob().text()
        expect(text).to.equal('Ά')
    });


    it('Should return an image, from a file', async function () {
        const { imageFromDom, blob, file } = await createObjectsForFileDummyTests()

        const image = await converter(file).toImage({ validateImage: false })//Create an image from "file"

        const blobFromImage = await imageToBlob(image, { height: imageFromDom.height, width: imageFromDom.width })//Create blob again, just to verify the size.
        expect(file.size).to.equal(1780070)

        if (![blob.size, file.size, blobFromImage.size].every((v, i, a) =>
            v === a[0]
        )) {
            // Check that all sizes are identical
            throw new Error("Sizes of the three binary objects isn't identical")
        }
        // const image2 = new Image()
        // image2.src  = URL.createObjectURL(blobFromImage)
        // debugger;
        // document.body.appendChild(image2)

    });

    it('Should return a dataUrl string from Blob', async function () {

        const imageFromDom = document.querySelector('img')//Take the original hidden image from the DOM.
        // const canvas = createCanvas(imageFromDom,{height:imageFromDom.height,width:imageFromDom.width})

        const blobFromImage = await imageToBlob(imageFromDom, { height: imageFromDom.height, width: imageFromDom.width })//Create blob again, just to verify the size.
        const dataUrl = await converter(blobFromImage).toBase64();
        debugger;
        const image = document.createElement('img')
        image.src = dataUrl
        expect(image.src.includes('data:image/png;base64,')).to.equal(true)

    });

    it('Should return a dataUrl string from File', async function () {

        const { file } = await createObjectsForFileDummyTests()
        const dataUrl = await converter(file).toBase64();
        debugger;
        expect(dataUrl.includes('base64,')).to.equal(true)

    });

    it('Should return an arrayBuffer, from a file', async function () {

        const { file } = await createObjectsForFileDummyTests()

        const arrayBuffer = await converter(file).toArrayBuffer()
        expect(arrayBuffer.byteLength).to.equal(1780070)
        // debugger;


    });

    it('Should return a Uint8Array, from a file', async function () {

        const { file } = await createObjectsForFileDummyTests()

        const uint8 = await converter(file).toUint8Array()
        expect(uint8.byteLength).to.equal(1780070)
        // debugger;


    });

    it('Should return an Int8Array, from a file', async function () {

        const { file } = await createObjectsForFileDummyTests()

        const int8 = await converter(file).toInt8Array()
        expect(int8.byteLength).to.equal(1780070)
        // debugger;


    });


})

async function createObjectsForFileDummyTests() {
    const imageFromDom = document.querySelector('img')//Take the original hidden image from the DOM.

    const canvas = createCanvas(imageFromDom, { width: imageFromDom.width, height: imageFromDom.height })

    const blob = await new Promise((res) => canvas.toBlob(res));//Create a Blob from the canvas.

    const file = new File([blob], 'Koala.jpg')//Create a file object, passing the Blob as the binary data.

    return {
        imageFromDom,
        blob,
        file
    }
}


