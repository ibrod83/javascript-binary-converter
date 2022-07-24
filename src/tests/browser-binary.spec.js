
var expect = chai.expect;
import { appendZeros, binaryToDecimal, decimalToBinary, groupBytes } from '../../build/dev/utils/binary.js';
import converter from '../../build/dev/converter.js'



function timeout(mil = 5000) {
    return new Promise((res) => {
        setTimeout(res, mil)
    })
}

describe('Browser binary tests', () => {



    it('Uint8: Should return correct numbers from a string of 8 bits', async function () {
        var decimal = binaryToDecimal('11111111')
        expect(decimal).to.equal(255)

        var decimal = binaryToDecimal('001')
        expect(decimal).to.equal(1)

        var decimal = binaryToDecimal('00101')
        expect(decimal).to.equal(5)

        var decimal = binaryToDecimal('101')
        expect(decimal).to.equal(5)

    });

    it('Uint16: Should return 65535 from a string of 16 bits', async function () {
        const decimal = binaryToDecimal('1111111111111111')
        expect(decimal).to.equal(65535)

    });
    it('Uint32: Should return 4294967295 from a string of 32 bits', async function () {
        const decimal = binaryToDecimal('11111111111111111111111111111111')

        expect(decimal).to.equal(4294967295)

    });

    it('Int8: Should return correct numbers from a string of 8 bits', async function () {
        var decimal = binaryToDecimal('10000000', true)
        expect(decimal).to.equal(-128)

        var decimal = binaryToDecimal('00000000', true)
        expect(decimal).to.equal(0)

        var decimal = binaryToDecimal('11111111', true)
        expect(decimal).to.equal(-1)

        var decimal = binaryToDecimal('11110111', true)
        expect(decimal).to.equal(-9)

        var decimal = binaryToDecimal('01110111', true)
        expect(decimal).to.equal(119)


    });

    it('Int16: Should return correct numbers from a string of 16 bits', async function () {
        var decimal = binaryToDecimal('1000000010000000', true)
        expect(decimal).to.equal(-32640)

        var decimal = binaryToDecimal('0000000000000000', true)
        expect(decimal).to.equal(0)

        var decimal = binaryToDecimal('1111111111111111', true)
        expect(decimal).to.equal(-1)

        var decimal = binaryToDecimal('1111011111110111', true)
        expect(decimal).to.equal(-2057)

        var decimal = binaryToDecimal('0111011101110111', true)
        expect(decimal).to.equal(30583)

    });

    it('Int32: Should return correct numbers from a string of 32 bits', async function () {
        var decimal = binaryToDecimal('10000000000000000000000000000000', true)
        expect(decimal).to.equal(-2147483648)

        var decimal = binaryToDecimal('00000000000000000000000000000000', true)
        expect(decimal).to.equal(0)

        var decimal = binaryToDecimal('11111111111111111111111111111111', true)
        expect(decimal).to.equal(-1)

        var decimal = binaryToDecimal('11110111111101111111011111110111', true)
        expect(decimal).to.equal(-134744073)

        var decimal = binaryToDecimal('01110111011101110111011101110111', true)
        expect(decimal).to.equal(2004318071)

    });

    it('Should create arrays of 16 bits, from an array of 8 bits', async function () {
        // await timeout()
        var bytes = ['11101111', '10111111', '00000001', '00000000']
        var joined = groupBytes(bytes, 2)
        expect(joined.length).to.equal(2)
        expect(joined[0]).to.equal('1110111110111111')
        expect(joined[1]).to.equal('0000000100000000')

        var bytes = ['11101111', '10111111', '00000001', '00000000', '11101001', '00111111', '00110001', '00001000']
        var joined = groupBytes(bytes, 2)
        expect(joined.length).to.equal(4)
        expect(joined[0]).to.equal('1110111110111111')
        expect(joined[1]).to.equal('0000000100000000')
        expect(joined[2]).to.equal('1110100100111111')
        expect(joined[3]).to.equal('0011000100001000')

    })

    it('Should create arrays of 32 bits, from an array of 8 bits', async function () {
        // await timeout()
        var bytes = ['11101111', '10111111', '00000001', '00000000']
        var joined = groupBytes(bytes, 4)
        expect(joined.length).to.equal(1)
        expect(joined[0]).to.equal('11101111101111110000000100000000')


        var bytes = ['11101111', '10111111', '00000001', '00000000', '11101001', '00111111', '00110001', '00001000']
        var joined = groupBytes(bytes, 4)
        expect(joined.length).to.equal(2)
        expect(joined[0]).to.equal('11101111101111110000000100000000')
        expect(joined[1]).to.equal('11101001001111110011000100001000')


    })




    it('Should return Uint8Array, and an Int8Array, from bytes', async function () {
        var bytes = ['11111111', '00000001']
        var uint8 = converter(bytes).toUint8Array()
        expect(uint8 instanceof Uint8Array).to.equal(true)
        expect(uint8[0]).to.equal(255)
        expect(uint8[1]).to.equal(1)

        var bytes = ['10000000', '01110111', '11110111']
        var int8 = converter(bytes).toInt8Array()
        expect(int8 instanceof Int8Array).to.equal(true)
        expect(int8[0]).to.equal(-128)
        expect(int8[1]).to.equal(119)
        expect(int8[2]).to.equal(-9)

    });

    it('Should return Uint16Array, and an Int16Array, from bytes', async function () {
        var bytes = ['11111111', '11111111', '00000000', '00000000']
        var uint16 = converter(bytes).toUint16Array()
        expect(uint16 instanceof Uint16Array).to.equal(true)
        expect(uint16[0]).to.equal(65535)
        expect(uint16[1]).to.equal(0)


        var bytes = ['11111111', '11111111', '11110111', '11110111', '10000000', '00000000']
        var int16 = converter(bytes).toInt16Array()
        expect(int16 instanceof Int16Array).to.equal(true)
        expect(int16[0]).to.equal(-1)
        expect(int16[1]).to.equal(-2057)
        expect(int16[2]).to.equal(-32768)

    });

    it('Should return an Int32Array, from bytes', async function () {

        var bytes = ['10000000', '00000000', '00000000', '00000000', '11110111', '11110111', '11110111', '11110111', '01110111', '01110111', '01110111', '01110111']
        var int32 = converter(bytes).toInt32Array()
        expect(int32 instanceof Int32Array).to.equal(true)
        expect(int32[0]).to.equal(-2147483648)
        expect(int32[1]).to.equal(-134744073)
        expect(int32[2]).to.equal(2004318071)

    });

    it('Should return a Uint32Array, from bytes', async function () {

        var bytes = ['10000000', '00000000', '00000000', '00000000', '11110111', '11110111', '11110111', '11110111', '01110111', '01110111', '01110111', '01110111']
        var uInt32 = converter(bytes).toUint32Array()
        expect(uInt32 instanceof Uint32Array).to.equal(true)
        expect(uInt32[0]).to.equal(2147483648)
        expect(uInt32[1]).to.equal(4160223223)
        expect(uInt32[2]).to.equal(2004318071)

    });
    it('Should return a "ΆΆ" string, from bytes', async function () {

        var bytes = ['11001110', '10000110', '11001110', '10000110']
        var text = converter(bytes).toText()
        expect(text).to.equal('ΆΆ')

    });
    it('Should return a an image, from bytes', async function () {

        const bytes = getBytes()

        var image = await converter(bytes).toImage()

        expect(image instanceof HTMLImageElement).to.equal(true)
        expect(image.width).to.equal(5)

    });


    it('Should return a Blob, from bytes', async function () {       
        const bytes = getBytes()
        var blob = await converter(bytes).toBlob()
        expect(blob instanceof Blob).to.equal(true)
        expect(blob.size === bytes.length).to.equal(true)
    });

})

function getBytes() {
    const extraSmallImageByteDecimals = [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 5, 0, 0, 0, 6, 8, 6, 0, 0, 0, 11, 251, 84, 75, 0, 0, 0, 1, 115, 82, 71, 66, 0, 174, 206, 28, 233, 0, 0, 0, 137, 73, 68, 65, 84, 24, 87, 1, 126, 0, 129, 255, 1, 255, 106, 48, 255, 213, 212, 208, 0, 0, 254, 0, 0, 43, 47, 29, 0, 0, 14, 18, 0, 1, 255, 113, 56, 255, 219, 204, 200, 0, 37, 43, 31, 0, 249, 245, 242, 0, 1, 8, 13, 0, 1, 251, 79, 26, 255, 217, 218, 230, 0, 43, 68, 39, 0, 220, 198, 217, 0, 36, 40, 26, 0, 1, 255, 85, 39, 255, 198, 199, 217, 0, 48, 52, 16, 0, 240, 241, 240, 0, 250, 247, 1, 0, 1, 249, 94, 58, 255, 183, 187, 198, 0, 37, 45, 16, 0, 37, 36, 36, 0, 217, 208, 221, 0, 1, 224, 77, 47, 255, 11, 16, 9, 0, 20, 66, 54, 0, 0, 235, 236, 0, 226, 197, 211, 0, 66, 133, 49, 43, 23, 66, 67, 118, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130];
    const bytes = extraSmallImageByteDecimals.map(decimal => appendZeros(decimalToBinary(decimal)))
    return bytes
}
