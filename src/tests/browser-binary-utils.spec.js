

import { binaryToDecimal, decimalToHexaDecimal, groupBytes } from '../../build/dev/utils/binary.js';
import converter from '../../build/dev/converter.js'
import { mockExpect as expect, getBytes, extraSmallImageByteDecimals, twosComplementExtraSmallImageBytes } from './test-utils.js'
describe('Browser binary utils tests',() => {
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

      // it('Uint8: Should return correct numbers from bits', async function () {
    //     var decimal = binaryToDecimal(11111111)
    //     expect(decimal).toBe(255)

    //     var decimal = binaryToDecimal(001)
    //     expect(decimal).toBe(1)
    //     debugger
    //     var decimal = binaryToDecimal(00101)
    //     expect(decimal).toBe(5)

    //     var decimal = binaryToDecimal(101)
    //     expect(decimal).toBe(5)

    // });

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

    });

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


    });

    it('Should return hex, from decimal', async function () {
        var decimal = 1234
        var hex = decimalToHexaDecimal(decimal)
        expect(hex).toBe('4D2')

        var decimal = -1234
        var hex = decimalToHexaDecimal(decimal)
        expect(hex).toBe('FFFFFB2E')

        var decimal = -1234534543
        var hex = decimalToHexaDecimal(decimal)
        expect(hex).toBe('B66A7F71')

    });

})

