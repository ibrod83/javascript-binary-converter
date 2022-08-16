const { expect } = require('expect');
const converter = require('../../../build/cjs/converter').default;




describe('Node DecimalConverter tests', () => {

    it('Should return  hex, from decimal', async function () {
        var bytes = [212, 252, 136, 43434343, -2] //-44,-4,-120 decimals in twos complement
        var hexes = []

        hexes[0] = converter(bytes[0]).toHex()
        hexes[1] = converter(bytes[1]).toHex()
        hexes[2] = converter(bytes[2]).toHex()
        hexes[3] = converter(bytes[3]).toHex()
        hexes[4] = converter(bytes[4]).toHex()
        expect(hexes[0]).toBe('D4')
        expect(hexes[1]).toBe('FC')
        expect(hexes[2]).toBe('88')
        expect(hexes[3]).toBe('296C167')
        expect(hexes[4]).toBe('FFFFFFFE')

    });

    it('Should return hex, from bigint', async function () {
      

        const hex = converter(17868022686844715136n).toHex()//

        expect(hex).toBe('F7F7F7F700000080')


    });

    it('Should return hex, from float', async function () {
       

        let hex = converter(1.1).toHex()//

        expect(hex).toBe('3F8CCCCD')

        hex = converter(-1.1).toHex()//

        expect(hex).toBe('BF8CCCCD')

        hex = converter(-0.43431).toHex()//

        expect(hex).toBe('BEDE5DE1')


    });


    it('Should return bytes, from decimal', async function () {
        let bytes = converter(422).toBytes();

        expect(bytes[0]).toBe('00000001')//most significant byte!
        expect(bytes[1]).toBe('10100110')

        expect(bytes.length).toBe(2)

        bytes = converter(422).toBytes({ endianness: 'LITTLE' });
        // console.log('bytes',bytes)

        expect(bytes[0]).toBe('10100110')
        expect(bytes[1]).toBe('00000001')//most significant byte!

        bytes = converter(256).toBytes({ endianness: 'LITTLE' });
        // console.log('bytes',bytes)

        expect(bytes[0]).toBe('00000000')
        expect(bytes[1]).toBe('00000001')//most significant byte!


        bytes = converter(534545).toBytes();

        expect(bytes[0]).toBe('00001000')//most significant byte!
        expect(bytes[1]).toBe('00101000')
        expect(bytes[2]).toBe('00010001')
        // expect(bytes.length).toBe(3)

        bytes = converter(-534545).toBytes();//
        console.log('bytes', bytes)//
        expect(bytes[0]).toBe('11111111')//most significant byte!
        expect(bytes[1]).toBe('11110111')
        expect(bytes[2]).toBe('11010111')
        expect(bytes[3]).toBe('11101111')
        // expect(bytes.length).toBe(4)


        bytes = converter(-143454544).toBytes();//
        console.log('bytes', bytes)
        // [       "11110111",        "01110011",       "00001110",       "10110000"     ]
        expect(bytes[0]).toBe('11110111')//most significant byte!
        expect(bytes[1]).toBe('01110011')
        expect(bytes[2]).toBe('00001110')
        expect(bytes[3]).toBe('10110000')


    });

    it('Should return bytes, from float', async function () {
        let bytes = converter(1.1).toBytes();

        // ["00111111", "10001100", "11001100", "11001101"]
        expect(bytes).toStrictEqual([        "11001101",        "11001100",       "10001100",       "00111111"    ])//little enddian!



    });

    it('Should return bytes, from bigint', async function () {
        const bytes = converter(17868022686844715136n).toBytes({ endianness: 'LITTLE' })
        expect(bytes).toStrictEqual(['11110111', '11110111', '11110111', '11110111', '00000000', '00000000', '00000000', '10000000'].reverse())

    });

    it('Should return binary, from bigint', async function () {
        const binary = converter(17868022686844715136n).toBinary()
        expect(binary).toBe('1111011111110111111101111111011100000000000000000000000010000000')

    });

    it('Should return binary, from float', async function () {
        const binary = converter(-0.32323).toBinary()
        expect(binary).toBe('10111110101001010111111001100111')

    });




})




