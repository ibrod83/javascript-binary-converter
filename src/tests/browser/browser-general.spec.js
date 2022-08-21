
import {mockExpect as expect} from './test-utils.js'
const javascriptBinaryConverter = window['javascript-binary-converter']

const {converter} = javascriptBinaryConverter;

const {image,binary} = javascriptBinaryConverter.utils
const { imageToBlob,  } = image;
const { integerToBinary, bigIntegerToBinary } = binary;

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


    it('Should return binary from bigint', async function () {//
        // 184467440737095516
        // let binary = integerToBinary(4294967295)//max 32 bit number 
        // let binary = integerToBinary(4294967296) //above 32 bit
        let binary = bigIntegerToBinary(184467440737095516n)
        expect(binary).toBe('1010001111010111000010100011110101110000101000111101011100')

        binary = bigIntegerToBinary(8844674407370955)
        expect(binary).toBe('11111011011000010111100111100001101001001000011001011')
        
        binary = bigIntegerToBinary(-2157483648)//
        expect(binary).toBe('1111111111111111111111111111111101111111011001110110100110000000')

        binary = bigIntegerToBinary(-3157483648434)//
        expect(binary).toBe('1111111111111111111111010010000011010111010011110000101001001110')


    });


   


})





