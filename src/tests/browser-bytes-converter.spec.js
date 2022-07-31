
import { binaryToDecimal, decimalToHexaDecimal, groupBytes } from '../../build/dev/utils/binary.js';
import converter from '../../build/dev/converter.js'
import { mockExpect as expect, getBytes, extraSmallImageByteDecimals, twosComplementExtraSmallImageBytes } from './test-utils.js'



describe('Browser BytesConverter tests', () => {

     

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

    it('Should return Uint8Array, and an Int8Array, from byte decimals', async function () {
        var bytes = [255, 1]
        var uint8 = converter(bytes).toUint8Array()
        expect(uint8 instanceof Uint8Array).toBe(true)
        expect(uint8[0]).toBe(255)
        expect(uint8[1]).toBe(1)

        var bytes = [128, 119, 247]
        var int8 = converter(bytes).toInt8Array()
        expect(int8 instanceof Int8Array).toBe(true)
        expect(int8[0]).toBe(-128)
        expect(int8[1]).toBe(119)
        expect(int8[2]).toBe(-9)

        var bytes = [-127, 119, -1]
        var int8 = converter(bytes).toInt8Array()
        expect(int8 instanceof Int8Array).toBe(true)
        expect(int8[0]).toBe(-127)
        expect(int8[1]).toBe(119)
        expect(int8[2]).toBe(-1)

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

    it('Should return a Float32Array, from bytes', async function () {
        var bytes = ['01000010', '00001010', '01000100', '10011100', '01000010', '00011010', '01000100', '10011100']
        // '01000010000010100100010010011100','01000010000110100100010010011100'
        var float32 = converter(bytes).toFloat32Array()
        expect(float32[0].toString().includes('34.5670013')).toBe(true)
        expect(float32[1].toString().includes('38.5670013')).toBe(true)


        var bytes = ['11000010', '00001010', '01000100', '10011100']
        // '11000010000010100100010010011100'
        var float32 = converter(bytes).toFloat32Array()
        expect(float32[0].toString().includes('-34.5670013')).toBe(true)

        var bytes = ['00111111', '00010001', '00100111', '00000000']
        // 00111111000100010010011100000000
        var float32 = converter(bytes).toFloat32Array()
        expect(float32[0].toString().includes('0.5670013')).toBe(true)

        var bytes = ['10111111', '00010001', '00100111', '00000000']
        // 10111111000100010010011100000000
        var float32 = converter(bytes).toFloat32Array()
        expect(float32[0].toString().includes('-0.5670013')).toBe(true)


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
        console.log('bytes', bytes)
        var decimals = converter(bytes).toDecimals()
        // console.log(decimals)
        var decimalsCorrect = decimals.every((decimal, index) => extraSmallImageByteDecimals[index] === decimal)
        expect(decimalsCorrect).toBe(true)


        var decimals = converter(bytes).toDecimals({ isSigned: true })

        var decimalsCorrect = decimals.every((decimal, index) => twosComplementExtraSmallImageBytes[index] === decimal)
        expect(decimalsCorrect).toBe(true)

        var bytes = ['01010100', '01010100', '11010100', '01010100']
        var decimals = converter(bytes).toDecimals({ isSigned: false, integerSize: 16 })

        expect(decimals[0]).toBe(21588)
        expect(decimals[1]).toBe(54356)

        var decimals = converter(bytes).toDecimals({ isSigned: true, integerSize: 16 })

        expect(decimals[0]).toBe(21588)
        expect(decimals[1]).toBe(-11180)


        var bytes = ['11010100', '01010100', '11010100', '01010100']
        var decimals = converter(bytes).toDecimals({ isSigned: false, integerSize: 32 })
        expect(decimals[0]).toBe(3562329172)

        var decimals = converter(bytes).toDecimals({ isSigned: true, integerSize: 32 })
        expect(decimals[0]).toBe(-732638124)

    });

    it('Should return decimals, from partial bytes', async function () {
        var bytes = getBytes()

        var decimals = converter(bytes).toDecimals()

        var decimalsCorrect = decimals.every((decimal, index) => extraSmallImageByteDecimals[index] === decimal)
        expect(decimalsCorrect).toBe(true)


        var decimals = converter(bytes).toDecimals({ isSigned: true })

        var decimalsCorrect = decimals.every((decimal, index) => twosComplementExtraSmallImageBytes[index] === decimal)
        expect(decimalsCorrect).toBe(true)

        var bytes = ['1010100', '1010100', '11010100', '1010100']
        var decimals = converter(bytes).toDecimals({ isSigned: false, integerSize: 16 })

        expect(decimals[0]).toBe(21588)
        expect(decimals[1]).toBe(54356)

    });

    

    it('Should return an array of hex, from an array of bytes', async function () {
        var bytes = ['11010100', '11111100', '10001000'] //-44,-4,-120 decimals in twos complement
        var hexes = converter(bytes).toHex()
        expect(hexes[0]).toBe('D4')
        expect(hexes[1]).toBe('FC')
        expect(hexes[2]).toBe('88')
        console.log('hexes', hexes)


        var hexes = converter(bytes).toHex({ isSigned: true })

        expect(hexes[0][hexes[0].length - 1]).toBe('4')
        expect(hexes[0][hexes[0].length - 2]).toBe('D')

        expect(hexes[1][hexes[1].length - 1]).toBe('C')
        expect(hexes[1][hexes[1].length - 2]).toBe('F')
        expect(hexes[2].includes('FF88')).toBe(true)
        console.log('hexes', hexes)

    });

    




})



