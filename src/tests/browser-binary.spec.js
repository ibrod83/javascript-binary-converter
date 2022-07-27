
import { appendZeros, binaryToDecimal, decimalToBinary, groupBytes } from '../../build/dev/utils/binary.js';
import converter from '../../build/dev/converter.js'
import {mockExpect as expect, getBytes, extraSmallImageByteDecimals, twosComplementExtraSmallImageBytes} from './test-utils.js'



function timeout(mil = 5000) {
    return new Promise((res) => {
        setTimeout(res, mil)
    })
}

describe('Browser binary tests', () => {



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
    it('Should return a an image, from bytes', async function () {

        const bytes = getBytes()

        var image = await converter(bytes).toImage()

        expect(image instanceof HTMLImageElement).toBe(true)
        expect(image.width).toBe(5)

    });


    it('Should return a Blob, from bytes', async function () {       
        const bytes = getBytes()
        var blob = await converter(bytes).toBlob()
        expect(blob instanceof Blob).toBe(true)
        expect(blob.size === bytes.length).toBe(true)
    });

    it('Should return decimals, from bytes', async function () {       
        var bytes = getBytes()
        console.log('bytes',bytes)
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




