
var expect = chai.expect;
import { binaryToDecimal } from '../../build/dev/utils/binary.js';
import converter from '../../build/dev/converter.js'





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
        var decimal = binaryToDecimal('10000000',true)
        expect(decimal).to.equal(-128)

        var decimal = binaryToDecimal('00000000',true)
        expect(decimal).to.equal(0)

        var decimal = binaryToDecimal('11111111',true)
        expect(decimal).to.equal(-1)

        var decimal = binaryToDecimal('11110111',true)
        expect(decimal).to.equal(-9)

        var decimal = binaryToDecimal('01110111',true)
        expect(decimal).to.equal(119)
        
        
    });

    it('Int16: Should return correct numbers from a string of 16 bits', async function () {
        var decimal = binaryToDecimal('1000000010000000',true)
        expect(decimal).to.equal(-32640)

        var decimal = binaryToDecimal('0000000000000000',true)
        expect(decimal).to.equal(0)

        var decimal = binaryToDecimal('1111111111111111',true)
        expect(decimal).to.equal(-1)

        var decimal = binaryToDecimal('1111011111110111',true)
        expect(decimal).to.equal(-2057)
        
        var decimal = binaryToDecimal('0111011101110111',true)
        expect(decimal).to.equal(30583)
        
    });

    it('Int32: Should return correct numbers from a string of 32 bits', async function () {
        var decimal = binaryToDecimal('10000000000000000000000000000000',true)
        expect(decimal).to.equal(-2147483648)

        var decimal = binaryToDecimal('00000000000000000000000000000000',true)
        expect(decimal).to.equal(0)

        var decimal = binaryToDecimal('11111111111111111111111111111111',true)
        expect(decimal).to.equal(-1)

        var decimal = binaryToDecimal('11110111111101111111011111110111',true)
        expect(decimal).to.equal(-134744073)
        
        var decimal = binaryToDecimal('01110111011101110111011101110111',true)
        expect(decimal).to.equal(2004318071)
        
    });      



    it('Should return Uint8Array, and an Int8Array, from bytes', async function () {
        var bytes = ['11111111','00000001']
        var uint8 = converter(bytes).toUint8Array()
        expect(uint8 instanceof Uint8Array).to.equal(true)
        expect(uint8[0]).to.equal(255)
        expect(uint8[1]).to.equal(1)

        var bytes = ['10000000','01110111','11110111']
        var int8 = converter(bytes).toInt8Array()
        expect(int8 instanceof Int8Array).to.equal(true)
        expect(int8[0]).to.equal(-128)
        expect(int8[1]).to.equal(119)
        expect(int8[2]).to.equal(-9)

    }); 
    
    it('Should return Uint16Array, and an Int16Array, from bytes', async function () {
        var bytes = ['1111111111111111','0000000000000000']
        var uint16 = converter(bytes).toUint16Array()
        expect(uint16 instanceof Uint16Array).to.equal(true)
        expect(uint16[0]).to.equal(65535)
        expect(uint16[1]).to.equal(0)

        var bytes = ['1111111111111111','1111011111110111','1000000000000000']
        var int16 = converter(bytes).toInt16Array()
        expect(int16 instanceof Int16Array).to.equal(true)
        expect(int16[0]).to.equal(-1)
        expect(int16[1]).to.equal(-2057)
        expect(int16[2]).to.equal(-32768)

    }); 

    it('Should return an Int32Array, from bytes', async function () {

        var bytes = ['10000000000000000000000000000000','11110111111101111111011111110111','01110111011101110111011101110111']
        var int32 = converter(bytes).toInt32Array()
        expect(int32 instanceof Int32Array).to.equal(true)
        expect(int32[0]).to.equal(-2147483648)
        expect(int32[1]).to.equal(-134744073)
        expect(int32[2]).to.equal(2004318071)

    }); 

})
