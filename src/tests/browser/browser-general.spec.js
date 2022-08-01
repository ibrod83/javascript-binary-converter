
import {mockExpect as expect} from './test-utils.js'
const javascriptBinaryConverter = window['javascript-binary-converter']

const {converter} = javascriptBinaryConverter;

const {image} = javascriptBinaryConverter.utils
const { imageToBlob  } = image;

/**
 * Some of these tests will fail on Firefox, probably due to different default quality in creation of jpeg.
 */
describe('Browser general tests', () => {

  

   
    it('Should return a dataUrl string from Blob', async function () {

        const imageFromDom = document.querySelector('#small')//Take the original hidden image from the DOM.
        const blobFromImage = await imageToBlob(imageFromDom, { height: imageFromDom.height, width: imageFromDom.width }, { type: 'image/png' })//Create blob again, just to verify the size.
        const dataUrl = await converter(blobFromImage).toBase64({ appendDataUrl: true });
        const image = document.createElement('img')
        image.src = dataUrl
        document.body.appendChild(image)
        expect(image.src.includes('data:image/png;base64,')).toBe(true)

    });


   


})





