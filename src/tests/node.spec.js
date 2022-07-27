const { expect } = require('expect');
const converter = require('../../build/cjs/converter.js').default;
const { TextDecoder } = require('util')
const { Blob } = require('node:buffer');
const { appendZeros, decimalToBinary,groupBytes,binaryToDecimal  } = require('../../build/cjs/utils/binary.js');
const { BlobConverter } = require('../../build/cjs/index.js');

/**
 * IMPORTANT: Make sure cjs build is refreshed!
 */
describe('Node tests', () => {

    it('Should return an Int8Array, from Uint8Array', async function () {
        this.timeout(0);
        const uint8 = new Uint8Array([206, 134])
        const int8 = converter(uint8).toInt8Array()
        expect(int8 instanceof Int8Array).toBe(true)
        expect(new TextDecoder().decode(int8)).toBe('Ά')//

    });

    it('Should return a Uint8Array, from Int8Array', async function () {

        const int8 = new Int8Array([-50, -122])
        const uint8 = converter(int8).toUint8Array()
        expect(uint8 instanceof Uint8Array).toBe(true)
        expect(new TextDecoder().decode(uint8)).toBe('Ά')

    });

    it('Should return an Int16Array, from Int8Array', async function () {//

        const int8 = new Int8Array([-50, -122])
        const int16 = converter(int8).toInt16Array()
        expect(int16 instanceof Int16Array).toBe(true)

    });

    it('Should return an "Ά" character, from Int8Array', async function () {

        const int8 = new Int8Array([-50, -122])
        const text = converter(int8).toText()
        expect(text).toBe('Ά')
    });

    it('Should return an "Ά" character, from Uint8Array', async function () {

        const int8 = new Uint8Array([206, 134])
        const text = converter(int8).toText()
        expect(text).toBe('Ά')
    });

    it('Should return a Blob, that is converted to "Ά", from Uint8Array', async function () {

        const uint8 = new Uint8Array([206, 134])
        const blob = await converter(uint8).toBlob();
        const text = await blob.text()
        expect(text).toBe('Ά')
    });

    it('Should return a Blob, that is converted to "Ά", from Int8Array', async function () {

        const int8 = new Int8Array([-50, -122])
        const blob = await converter(int8).toBlob();
        const text = await blob.text()
        expect(text).toBe('Ά')
    });

    it('Should return a dataUrl string from Blob', async function () {

        const blob = new Blob([206, 134])
        const blobConverter = new BlobConverter(blob)
        const url = await blobConverter.toBase64();

        expect(typeof url).toBe('string')
    });
   

    it('Should return bytes from Blob', async function () {

        const blob = new Blob([206])
        const blobConverter = new BlobConverter(blob)
        const bytes = await blobConverter.toBytes()
        expect(bytes.length).toBe(3)

    });

    it('Should return a Uint8Array, from an ArrayBuffer', async function () {

        const buffer = new ArrayBuffer(5)
        const uint8 = converter(buffer).toUint8Array()
        expect(uint8.constructor.name).toBe('Uint8Array')
        expect(uint8.buffer === buffer).toBe(true)
    });

    it('Uint8: Should return correct numbers from a string of 8 bits', async function () {
        var decimal = binaryToDecimal('11111111')
        expect(decimal).toBe(255)

        var decimal = binaryToDecimal('001')
        expect(decimal).toBe(1)

        var decimal = binaryToDecimal('00101')
        expect(decimal).toBe(5)

        var decimal = binaryToDecimal('101')
        expect(decimal).toBe(5)

    });

    it('Uint16: Should return 65535 from a string of 16 bits', async function () {
        const decimal = binaryToDecimal('1111111111111111')
        expect(decimal).toBe(65535)

    });
    it('Uint32: Should return 4294967295 from a string of 32 bits', async function () {
        const decimal = binaryToDecimal('11111111111111111111111111111111')

        expect(decimal).toBe(4294967295)

    });

    it('Int8: Should return correct numbers from a string of 8 bits', async function () {
        var decimal = binaryToDecimal('10000000', true)
        expect(decimal).toBe(-128)

        var decimal = binaryToDecimal('00000000', true)
        expect(decimal).toBe(0)

        var decimal = binaryToDecimal('11111111', true)
        expect(decimal).toBe(-1)

        var decimal = binaryToDecimal('11110111', true)
        expect(decimal).toBe(-9)

        var decimal = binaryToDecimal('01110111', true)
        expect(decimal).toBe(119)


    });

    it('Int16: Should return correct numbers from a string of 16 bits', async function () {
        var decimal = binaryToDecimal('1000000010000000', true)
        expect(decimal).toBe(-32640)

        var decimal = binaryToDecimal('0000000000000000', true)
        expect(decimal).toBe(0)

        var decimal = binaryToDecimal('1111111111111111', true)
        expect(decimal).toBe(-1)

        var decimal = binaryToDecimal('1111011111110111', true)
        expect(decimal).toBe(-2057)

        var decimal = binaryToDecimal('0111011101110111', true)
        expect(decimal).toBe(30583)

    });

    it('Int32: Should return correct numbers from a string of 32 bits', async function () {
        var decimal = binaryToDecimal('10000000000000000000000000000000', true)
        expect(decimal).toBe(-2147483648)

        var decimal = binaryToDecimal('00000000000000000000000000000000', true)
        expect(decimal).toBe(0)

        var decimal = binaryToDecimal('11111111111111111111111111111111', true)
        expect(decimal).toBe(-1)

        var decimal = binaryToDecimal('11110111111101111111011111110111', true)
        expect(decimal).toBe(-134744073)

        var decimal = binaryToDecimal('01110111011101110111011101110111', true)
        expect(decimal).toBe(2004318071)

    });

    it('Should create arrays of 16 bits, from an array of 8 bits', async function () {
        // await timeout()
        var bytes = ['11101111', '10111111', '00000001', '00000000']
        var joined = groupBytes(bytes, 2)
        expect(joined.length).toBe(2)
        expect(joined[0]).toBe('1110111110111111')
        expect(joined[1]).toBe('0000000100000000')

        var bytes = ['11101111', '10111111', '00000001', '00000000', '11101001', '00111111', '00110001', '00001000']
        var joined = groupBytes(bytes, 2)
        expect(joined.length).toBe(4)
        expect(joined[0]).toBe('1110111110111111')
        expect(joined[1]).toBe('0000000100000000')
        expect(joined[2]).toBe('1110100100111111')
        expect(joined[3]).toBe('0011000100001000')

    })

    it('Should create arrays of 32 bits, from an array of 8 bits', async function () {
        // await timeout()
        var bytes = ['11101111', '10111111', '00000001', '00000000']
        var joined = groupBytes(bytes, 4)
        expect(joined.length).toBe(1)
        expect(joined[0]).toBe('11101111101111110000000100000000')


        var bytes = ['11101111', '10111111', '00000001', '00000000', '11101001', '00111111', '00110001', '00001000']
        var joined = groupBytes(bytes, 4)
        expect(joined.length).toBe(2)
        expect(joined[0]).toBe('11101111101111110000000100000000')
        expect(joined[1]).toBe('11101001001111110011000100001000')


    })




    it('Should return Uint8Array, and an Int8Array, from bytes', async function () {
        var bytes = ['11111111', '00000001']
        var uint8 = converter(bytes).toUint8Array()
        expect(uint8 instanceof Uint8Array).toBe(true)
        expect(uint8[0]).toBe(255)
        expect(uint8[1]).toBe(1)

        var bytes = ['10000000', '01110111', '11110111']
        var int8 = converter(bytes).toInt8Array()
        expect(int8 instanceof Int8Array).toBe(true)
        expect(int8[0]).toBe(-128)
        expect(int8[1]).toBe(119)
        expect(int8[2]).toBe(-9)

    });

    it('Should return Uint16Array, and an Int16Array, from bytes', async function () {
        var bytes = ['11111111', '11111111', '00000000', '00000000']
        var uint16 = converter(bytes).toUint16Array()
        expect(uint16 instanceof Uint16Array).toBe(true)
        expect(uint16[0]).toBe(65535)
        expect(uint16[1]).toBe(0)


        var bytes = ['11111111', '11111111', '11110111', '11110111', '10000000', '00000000']
        var int16 = converter(bytes).toInt16Array()
        expect(int16 instanceof Int16Array).toBe(true)
        expect(int16[0]).toBe(-1)
        expect(int16[1]).toBe(-2057)
        expect(int16[2]).toBe(-32768)

    });

    it('Should return an Int32Array, from bytes', async function () {

        var bytes = ['10000000', '00000000', '00000000', '00000000', '11110111', '11110111', '11110111', '11110111', '01110111', '01110111', '01110111', '01110111']
        var int32 = converter(bytes).toInt32Array()
        expect(int32 instanceof Int32Array).toBe(true)
        expect(int32[0]).toBe(-2147483648)
        expect(int32[1]).toBe(-134744073)
        expect(int32[2]).toBe(2004318071)

    });

    it('Should return a Uint32Array, from bytes', async function () {

        var bytes = ['10000000', '00000000', '00000000', '00000000', '11110111', '11110111', '11110111', '11110111', '01110111', '01110111', '01110111', '01110111']
        var uInt32 = converter(bytes).toUint32Array()
        expect(uInt32 instanceof Uint32Array).toBe(true)
        expect(uInt32[0]).toBe(2147483648)
        expect(uInt32[1]).toBe(4160223223)
        expect(uInt32[2]).toBe(2004318071)

    });
    it('Should return a "ΆΆ" string, from bytes', async function () {

        var bytes = ['11001110', '10000110', '11001110', '10000110']
        var text = converter(bytes).toText()
        expect(text).toBe('ΆΆ')

    });
  


    it('Should return a Blob, from bytes', async function () {       
        const bytes = getBytes()
        var blob = await converter(bytes).toBlob()
        expect(blob instanceof Blob).toBe(true)
        expect(blob.size === bytes.length).toBe(true)
    });

    it('Should return decimals, from bytes', async function () {       
        var bytes = getBytes()

        var decimals = converter(bytes).toDecimals()
        // console.log(decimals)
        var decimalsCorrect = decimals.every((decimal,index)=>extraSmallImageByteDecimals[index] === decimal)
        expect(decimalsCorrect).toBe(true)

  
        var decimals = converter(bytes).toDecimals({isSigned:true})
     
        var decimalsCorrect = decimals.every((decimal,index)=>twosComplementExtraSmallImageBytes[index] === decimal)
        expect(decimalsCorrect).toBe(true)

        var bytes = ['01010100','01010100','11010100','01010100']
        var decimals = converter(bytes).toDecimals({isSigned:false,integerSize:16})
     
        expect(decimals[0]).toBe(21588)
        expect(decimals[1]).toBe(54356)

        var decimals = converter(bytes).toDecimals({isSigned:true,integerSize:16})
    
        expect(decimals[0]).toBe(21588)
        expect(decimals[1]).toBe(-11180)


        var bytes = ['11010100','01010100','11010100','01010100']
        var decimals = converter(bytes).toDecimals({isSigned:false,integerSize:32})
        expect(decimals[0]).toBe(3562329172)

        var decimals = converter(bytes).toDecimals({isSigned:true,integerSize:32})
        expect(decimals[0]).toBe(-732638124)
 

    
    });




})



const extraSmallImageByteDecimals = [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 5, 0, 0, 0, 6, 8, 6, 0, 0, 0, 11, 251, 84, 75, 0, 0, 0, 1, 115, 82, 71, 66, 0, 174, 206, 28, 233, 0, 0, 0, 137, 73, 68, 65, 84, 24, 87, 1, 126, 0, 129, 255, 1, 255, 106, 48, 255, 213, 212, 208, 0, 0, 254, 0, 0, 43, 47, 29, 0, 0, 14, 18, 0, 1, 255, 113, 56, 255, 219, 204, 200, 0, 37, 43, 31, 0, 249, 245, 242, 0, 1, 8, 13, 0, 1, 251, 79, 26, 255, 217, 218, 230, 0, 43, 68, 39, 0, 220, 198, 217, 0, 36, 40, 26, 0, 1, 255, 85, 39, 255, 198, 199, 217, 0, 48, 52, 16, 0, 240, 241, 240, 0, 250, 247, 1, 0, 1, 249, 94, 58, 255, 183, 187, 198, 0, 37, 45, 16, 0, 37, 36, 36, 0, 217, 208, 221, 0, 1, 224, 77, 47, 255, 11, 16, 9, 0, 20, 66, 54, 0, 0, 235, 236, 0, 226, 197, 211, 0, 66, 133, 49, 43, 23, 66, 67, 118, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130];
const twosComplementExtraSmallImageBytes = [ -119, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 5, 0, 0, 0, 6, 8, 6, 0, 0, 0, 11, -5, 84, 75, 0, 0, 0, 1, 115, 82, 71, 66, 0, -82, -50, 28, -23, 0, 0, 0, -119, 73, 68, 65, 84, 24, 87, 1, 126, 0, -127, -1, 1, -1, 106, 48, -1, -43, -44, -48, 0, 0, -2, 0, 0, 43, 47, 29, 0, 0, 14, 18, 0, 1, -1, 113, 56, -1, -37, -52, -56, 0, 37, 43, 31, 0, -7, -11, -14, 0, 1, 8, 13, 0, 1, -5, 79, 26, -1, -39, -38, -26, 0, 43, 68, 39, 0, -36, -58, -39, 0, 36, 40, 26, 0, 1, -1, 85, 39, -1, -58, -57, -39, 0, 48, 52, 16, 0, -16, -15, -16, 0, -6, -9, 1, 0, 1, -7, 94, 58, -1, -73, -69, -58, 0, 37, 45, 16, 0, 37, 36, 36, 0, -39, -48, -35, 0, 1, -32, 77, 47, -1, 11, 16, 9, 0, 20, 66, 54, 0, 0, -21, -20, 0, -30, -59, -45, 0, 66, -123, 49, 43, 23, 66, 67, 118, 0, 0, 0, 0, 73, 69, 78, 68, -82, 66, 96, -126 ]
function getBytes() {
    const bytes = extraSmallImageByteDecimals.map(decimal => appendZeros(decimalToBinary(decimal)))
    return bytes
}
