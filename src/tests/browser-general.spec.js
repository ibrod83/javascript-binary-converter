
var expect = chai.expect;
import converter from '../../build/dev/converter.js'
import { imageToCanvas, imageToBlob } from '../../build/dev/utils/image.js';
import { createObjectsForFileDummyTests } from './test-utils.js';



/**
 * Some of these tests will fail on Firefox, probably due to different default quality in creation of jpeg.
 */
describe('Browser general tests', () => {

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
        const blob = await converter(int8).toBlob()
        const text = await blob.text()
        expect(text).to.equal('Ά')
    });

    it('Should return a Blob, that is converted to "Ά", from Int8Array', async function () {

        const int8 = new Int8Array([-50, -122])
        const blob = await converter(int8).toBlob()
        const text = await blob.text()
        expect(text).to.equal('Ά')
    });
    

   
    it('Should return a dataUrl string from Blob', async function () {

        const imageFromDom = document.querySelector('#small')//Take the original hidden image from the DOM.
        const blobFromImage = await imageToBlob(imageFromDom, { height: imageFromDom.height, width: imageFromDom.width }, { type: 'image/png' })//Create blob again, just to verify the size.
        const dataUrl = await converter(blobFromImage).toBase64({ appendDataUrl: true });
        const image = document.createElement('img')
        image.src = dataUrl
        document.body.appendChild(image)
        expect(image.src.includes('data:image/png;base64,')).to.equal(true)

    });

    it('Should return a dataUrl string from File', async function () {

        const { file } = await createObjectsForFileDummyTests('#small')
        const dataUrl = await converter(file).toBase64({ appendDataUrl: true });
        expect(dataUrl.includes('base64,')).to.equal(true)

    });


    it('Should return a plain dataUrl string from File', async function () {

        const { file } = await createObjectsForFileDummyTests('#small')
        const dataUrl = await converter(file).toBase64();
        expect(typeof dataUrl === 'string').to.equal(true)
        expect(dataUrl.includes('base64,')).to.equal(false)

    });

    it('Should return an arrayBuffer, from a file', async function () {

        const { file } = await createObjectsForFileDummyTests('#Koala')

        const arrayBuffer = await converter(file).toArrayBuffer()
        expect(arrayBuffer.byteLength).to.equal(1780070)
        // debugger;


    });

    it('Should return a Uint8Array, from a file', async function () {

        const { file } = await createObjectsForFileDummyTests('#Koala')

        const uint8 = await converter(file).toUint8Array()
        expect(uint8.byteLength).to.equal(1780070)
        // debugger;


    });

    it('Should return an Int8Array, from a file', async function () {

        const { file } = await createObjectsForFileDummyTests('#Koala')

        const int8 = await converter(file).toInt8Array()
        expect(int8.byteLength).to.equal(1780070)


    }); 
    

    it('Should return a Uint8Array, from an ArrayBuffer', async function () {

        const buffer = new ArrayBuffer(5)
        const uint8 = converter(buffer).toUint8Array()
        expect(uint8.constructor.name).to.equal('Uint8Array')
        expect(uint8.buffer === buffer).to.equal(true)
    });
   
    it('Should return bytes, from an ArrayBuffer', async function () {
        const { blob} = await createObjectsForFileDummyTests('#extra-small')
        const buffer = await converter(blob).toArrayBuffer()
        const bytes = converter(buffer).toBytes() 
        expect(bytes.length).to.equal(buffer.byteLength)
    });

    it('Should return Blob, from an ArrayBuffer', async function () {
        const int8 = new Int8Array([1])
        const blob = await converter(int8).toBlob({type:"application/octet-stream"})

        expect(blob.type).to.equal('application/octet-stream')
        expect(blob.size).to.equal(1)
    });

    it('Should return bytes, from a Blob', async function () {
        const { blob} = await createObjectsForFileDummyTests('#extra-small')
        const bytes = await converter(blob).toBytes() 
        expect(bytes.length).to.equal(blob.size)
    });

   

    it('Should return bytes, from an Int8Array', async function () {
        const { blob} = await createObjectsForFileDummyTests('#extra-small')
        const int8 = await converter(blob).toInt8Array()
        const bytes = converter(int8).toBytes() 
      
        expect(bytes.length).to.equal(int8.byteLength)
    
    });


    


})





