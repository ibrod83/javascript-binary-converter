const { expect } = require('expect');
const converter = require('../../../build/cjs/converter').default;
const { Blob } = require('node:buffer');
const { getBytes,extraSmallImageDecimalBytes,twosComplementExtraSmallImageBytes} = require('./test-utils');



describe('Node BytesConverter tests', () => {

     

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

        var bytes = ['10100110','00000001', ]//little endian
        var uint16 = converter(bytes).toUint16Array()
        expect(uint16 instanceof Uint16Array).toBe(true)
        expect(uint16[0]).toBe(422)

  
        var bytes = ['11111111', '11111111', '11110111', '11110111', '10000000', '00000000']//little endian
        var int16 = converter(bytes).toInt16Array()
        expect(int16 instanceof Int16Array).toBe(true)
        expect(int16[0]).toBe(-1)
        expect(int16[1]).toBe(-2057)
        expect(int16[2]).toBe(128)

    });
    

    it('Should return an Int32Array, from bytes', async function () {

        var bytes = ['10000000', '00000000', '00000000', '00000000', '11110111', '11110111', '11110111', '11110111', '01110111', '01110111', '01110111', '01110111']
        var int32 = converter(bytes).toInt32Array()
        expect(int32 instanceof Int32Array).toBe(true)
        expect(int32[0]).toBe(128)
        expect(int32[1]).toBe(-134744073)
        expect(int32[2]).toBe(2004318071)

    });

    it('Should return a Uint32Array, from bytes', async function () {

        var bytes = ['10000000', '00000000', '00000000', '00000000', '11110111', '11110111', '11110111', '11110111', '01110111', '01110111', '01110111', '01110111']
        var uInt32 = converter(bytes).toUint32Array()
        expect(uInt32 instanceof Uint32Array).toBe(true)
        expect(uInt32[0]).toBe(128)
        expect(uInt32[1]).toBe(4160223223)
        expect(uInt32[2]).toBe(2004318071)

    });

    it('Should return a BigInt64Array, from bytes', async function () {
        
        var bytes = ['10000000', '00000000', '00000000', '00000000', '11110111', '11110111', '11110111', '11110111','10000000', '00000000', '00000000', '00000000', '11110111', '11110111', '11110111', '11110111']
        var int64 = converter(bytes).toBigInt64Array()
        expect(int64 instanceof BigInt64Array).toBe(true)
        expect(int64.length).toBe(2)

        expect(int64[0]).toBe(-578721386864836480n)
        expect(int64[1]).toBe(-578721386864836480n)

  

    });

    it('Should return a BigUint64Array, from bytes', async function () {
        
        var bytes = ['10000000', '00000000', '00000000', '00000000', '11110111', '11110111', '11110111', '11110111','10000000', '00000000', '00000000', '00000000', '11110111', '11110111', '11110111', '11110111']
        var int64 = converter(bytes).toBigUint64Array()
        expect(int64 instanceof BigUint64Array).toBe(true)
        expect(int64.length).toBe(2)

        expect(int64[0].toString()).toBe('17868022686844715136')//
        expect(int64[1].toString()).toBe('17868022686844715136')//
        // expect(int64[1]).toBe(-17868022686844715136n)

  

    });

    it('Should return a Float32Array, from bytes', async function () {
        var bytes = ['01000010', '00001010', '01000100', '10011100', '01000010', '00011010', '01000100', '10011100']
        // '01000010000010100100010010011100','10011100010001000001101001000010'
        // '10011100010001000000101001000010','01000010000110100100010010011100'//reverse byte order, default
        var float32 = converter(bytes).toFloat32Array()
        expect(float32[0].toString().includes('-6.48642')).toBe(true)
        expect(float32[1].toString().includes('-6.488489')).toBe(true)


        var bytes = ['11000010', '00001010', '01000100', '10011100']
        // '11000010000010100100010010011100'
        // '10011100010001000000101011000010' reverse, default
        var float32 = converter(bytes).toFloat32Array()
     
        expect(float32[0].toString().includes('-6.48648')).toBe(true)

        var bytes = ['00111111', '00010001', '00100111', '00000000']
        // 00111111000100010010011100000000
        //00000000001001110001000100111111//reverse, default
        var float32 = converter(bytes).toFloat32Array()
        expect(float32[0].toString().includes('3.58777')).toBe(true)

        var bytes = ['10111111', '00010001', '00100111', '00000000']
        // 10111111000100010010011100000000
        //00000000001001110001000110111111 //reverse, default
        var float32 = converter(bytes).toFloat32Array()
        expect(float32[0].toString().includes('3.58795')).toBe(true)


    });

    it('Should return a "ΆΆ" string, from bytes', async function () {

        var bytes = ['11001110', '10000110', '11001110', '10000110']
        var text = converter(bytes).toText()
        expect(text).toBe('ΆΆ')

    });
   ;


    it('Should return a Blob, from bytes', async function () {
        const bytes = getBytes()
        var blob = await converter(bytes).toBlob()
        expect(blob instanceof Blob).toBe(true)
        expect(blob.size === bytes.length).toBe(true)
    });

    it('Should return integers, from bytes', async function () {
        var bytes = getBytes()
        // console.log('bytes', bytes)
        var decimals = converter(bytes).toIntegers()
        // console.log(decimals)
        var decimalsCorrect = decimals.every((decimal, index) => extraSmallImageDecimalBytes[index] === decimal)
        expect(decimalsCorrect).toBe(true)


        var decimals = converter(bytes).toIntegers({ isSigned: true })

        var decimalsCorrect = decimals.every((decimal, index) => twosComplementExtraSmallImageBytes[index] === decimal)
        expect(decimalsCorrect).toBe(true)

        var bytes = ['01010100', '01010100', '11010100', '01010100']
        var decimals = converter(bytes).toIntegers({ isSigned: false, integerSize: 16 })

        expect(decimals[0]).toBe(21588)
        expect(decimals[1]).toBe(21716)

        var decimals = converter(bytes).toIntegers({ isSigned: true, integerSize: 16 })

        expect(decimals[0]).toBe(21588)
        expect(decimals[1]).toBe(21716)


        var bytes = ['11010100', '01010100', '11010100', '01010100']
        //01010100110101000101010011010100
        //01010100110101000101010011010100
        var decimals = converter(bytes).toIntegers({ isSigned: false, integerSize: 32 })
        expect(decimals[0]).toBe(1423201492)

        var decimals = converter(bytes).toIntegers({ isSigned: true, integerSize: 32 })
        expect(decimals[0]).toBe(1423201492)

    });

    it('Should return bigints, from bytes', async function () {
    
        var bytes = ['10000000', '00000000', '00000000', '00000000', '11110111', '11110111', '11110111', '11110111','10000000', '00000000', '00000000', '00000000', '11110111', '11110111', '11110111', '11110111']

        // TODO: explore endianess issue of all byte conversion
        var decimals = converter(bytes).toIntegers({integerSize:64})
        expect(decimals.length).toBe(2)//
        expect(decimals[0].toString()).toBe("17868022686844715136")
        expect(decimals[1].toString()).toBe("17868022686844715136")

        decimals = converter(bytes).toIntegers({integerSize:64,isSigned:true})
        expect(decimals.length).toBe(2)//
        expect(decimals[0].toString()).toBe("-578721386864836480")
        expect(decimals[1].toString()).toBe("-578721386864836480")


    });

    it('Should return integers, from partial bytes', async function () {
        var bytes = getBytes()

        var decimals = converter(bytes).toIntegers()

        var decimalsCorrect = decimals.every((decimal, index) => extraSmallImageDecimalBytes[index] === decimal)
        expect(decimalsCorrect).toBe(true)


        var decimals = converter(bytes).toIntegers({ isSigned: true })

        var decimalsCorrect = decimals.every((decimal, index) => twosComplementExtraSmallImageBytes[index] === decimal)
        expect(decimalsCorrect).toBe(true)

        var bytes = ['1010100', '1010100', '11010100', '1010100']
        var decimals = converter(bytes).toIntegers({ isSigned: false, integerSize: 16 })

        expect(decimals[0]).toBe(21588)
        expect(decimals[1]).toBe(21716)

    });

    

    it('Should return an array of hex, from an array of bytes', async function () {
        var bytes = ['11010100', '11111100', '10001000'] //-44,-4,-120 decimals in twos complement
        var hexes = converter(bytes).toHexString()
        expect(hexes[0]).toBe('D4')
        expect(hexes[1]).toBe('FC')
        expect(hexes[2]).toBe('88')
        // console.log('hexes', hexes)


        var hexes = converter(bytes).toHexString({ isSigned: true })

        expect(hexes[0][hexes[0].length - 1]).toBe('4')
        expect(hexes[0][hexes[0].length - 2]).toBe('D')

        expect(hexes[1][hexes[1].length - 1]).toBe('C')
        expect(hexes[1][hexes[1].length - 2]).toBe('F')
        expect(hexes[2].includes('FF88')).toBe(true)
        // console.log('hexes', hexes)

    });


    
    




})




