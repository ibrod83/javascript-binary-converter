
import converter from '../../build/dev/converter.js'
import { imageToCanvas, imageToBlob } from '../../build/dev/utils/image.js';
import { createObjectsForFileDummyTests, dummyImageBytes, extraSmallImageByteDecimals } from './test-utils.js';
import {mockExpect as expect} from './test-utils.js'



/**
 * Some of these tests will fail on Firefox, probably due to different default quality in creation of jpeg.
 */
describe('Browser image tests', () => {

   it('Should return an image, from a file', async function () {
        const { imageFromDom, blob, file } = await createObjectsForFileDummyTests('#Koala')
        const image = await converter(file).toImage({ validateImage: false })//Create an image from "file"

        const blobFromImage = await imageToBlob(image, { height: imageFromDom.height, width: imageFromDom.width }, { type: 'image/png' })//Create blob again, just to verify the size.
        expect(file.size).toBe(1780070)

        const imageFromBlob = await converter(blobFromImage).toImage()
        imageFromBlob.id = 'koala-from-blob'
        document.body.appendChild(imageFromBlob)

        const koalaFromBlob = document.querySelector('#koala-from-blob');

        expect(koalaFromBlob.width).toBe(1024)
        if (![blob.size, file.size, blobFromImage.size].every((v, i, a) =>
            v === a[0]
        )) {
            // Check that all sizes are identical
            throw new Error("Sizes of the three binary objects isn't identical")
        }
    });


    it('Should return a canvas, from a Blob', async function () {
        const { blob } = await createObjectsForFileDummyTests('#small')

        const canvas = await converter(blob).toCanvas()
        document.body.appendChild(canvas)
        expect(canvas instanceof HTMLCanvasElement).toBe(true)
        expect(canvas.width === 24 && canvas.height === 29).toBe(true)
    });


    it('Should return an Image, from an ArrayBuffer', async function () {

        const uint8 = new Uint8Array(dummyImageBytes)
        const buffer = uint8.buffer

        const image = await converter(buffer).toImage()

        // document.body.appendChild(image)
    });

    it('Should return an Image, from a Uint8Array', async function () {

        const uint8 = new Uint8Array(dummyImageBytes)

        const image = await converter(uint8).toImage({ maxSize: 10 })

        expect(image instanceof HTMLImageElement).toBe(true)
        expect(image.height).toBe(10)
    });


    it('Should return a Blob, from an Image', async function () {

        const { imageFromDom, blob: originalBlob } = await createObjectsForFileDummyTests('#small');
        const blob = await converter(imageFromDom).toBlob();
        const imageFromBlob = await converter(blob).toImage()//
        document.body.appendChild(imageFromBlob)
        expect(blob.size === originalBlob.size).toBe(true)
        expect(imageFromBlob instanceof HTMLImageElement).toBe(true)
        // debugger;
    });

    it('Should return a Uint8Array and an Int8Array, from an Image', async function () {

        const { imageFromDom, blob } = await createObjectsForFileDummyTests('#small');
        const uint8 = await converter(imageFromDom).toUint8Array()
        expect(uint8.byteLength).toBe(blob.size)
        const int8 = await converter(imageFromDom).toInt8Array()
        expect(int8 instanceof Int8Array).toBe(true)
        expect(int8.byteLength).toBe(blob.size)
    });

    it('Should return a canvas, from an Image', async function () {

        var { imageFromDom } = await createObjectsForFileDummyTests('#small');
        var canvas = converter(imageFromDom).toCanvas()//
        expect(canvas instanceof HTMLCanvasElement).toBe(true)
        expect(canvas.width === imageFromDom.width && canvas.height === imageFromDom.height).toBe(true)

        var { imageFromDom } = await createObjectsForFileDummyTests('#small');
        var canvas = converter(imageFromDom).toCanvas({ height: 1, width: 1 })
        expect(canvas instanceof HTMLCanvasElement).toBe(true)
        expect(canvas.width === 1 && canvas.height === 1).toBe(true)
    });

    it('Should return an ArrayBuffer, from an Image', async function () {

        var { imageFromDom, blob } = await createObjectsForFileDummyTests('#small');
        var buffer = await converter(imageFromDom).toArrayBuffer()//
        expect(buffer.byteLength === blob.size).toBe(true)

    });

    it('Should return bytes, from an Image', async function () {

        const { imageFromDom } = await createObjectsForFileDummyTests('#extra-small')
        const bytes = await converter(imageFromDom).toBytes()
        expect(bytes.length).toBe(extraSmallImageByteDecimals.length)
        const decimalsFromBytes = bytes.map(byte => parseInt(byte, 2))
        const uint8 = new Uint8Array(decimalsFromBytes)
        const image = await converter(uint8).toImage()
        document.body.appendChild(image)
    });








})





