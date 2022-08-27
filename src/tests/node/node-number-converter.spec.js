const { expect } = require('expect');
const {converter} = require('../../../build/cjs');




describe('Node NumberConverter tests', () => {

    it('Should return  hex, from decimal', async function () {
        var bytes = [212, 252, 136, 43434343, -2] //-44,-4,-120 decimals in twos complement
        var hexes = []

        hexes[0] = converter(bytes[0]).toHexString()
        hexes[1] = converter(bytes[1]).toHexString()
        hexes[2] = converter(bytes[2]).toHexString()
        hexes[3] = converter(bytes[3]).toHexString()
        hexes[4] = converter(bytes[4]).toHexString()
        expect(hexes[0]).toBe('D4')
        expect(hexes[1]).toBe('FC')
        expect(hexes[2]).toBe('88')
        expect(hexes[3]).toBe('296C167')
        expect(hexes[4]).toBe('FFFFFFFE')

    });

    it('Should return hex, from bigint', async function () {


        let hex = converter(17868022686844715136n).toHexString()

        expect(hex).toBe('F7F7F7F700000080')

        hex = converter(0o1737677577340000000200n).toHexString()

        expect(hex).toBe('F7F7F7F700000080')

        hex = converter(0b001111011111110111111101111111011100000000000000000000000010000000n).toHexString()

        expect(hex).toBe('F7F7F7F700000080')


    });

    it('Should return hex, from float', async function () {


        let hex = converter(1.1).toHexString()

        expect(hex).toBe('3F8CCCCD')

        hex = converter(-1.1).toHexString()

        expect(hex).toBe('BF8CCCCD')

        hex = converter(-0.43431).toHexString()

        expect(hex).toBe('BEDE5DE1')


    });

    it('Should return hex, from double precision float', async function () {


        let hex = converter(1.1).toHexString({ precision: 'DOUBLE' })

        expect(hex).toBe('3FF199999999999A')

        hex = converter(-1.1).toHexString({ precision: 'DOUBLE' })

        expect(hex).toBe('BFF199999999999A')

        hex = converter(-0.43431).toHexString({ precision: 'DOUBLE' })

        expect(hex).toBe('BFDBCBBC2B94D940')

        hex = converter(-0.43431444344444443455).toHexString({ precision: 'DOUBLE' })

        expect(hex).toBe('BFDBCBCECEB18EA1')

        hex = converter(3232434.43434556565666443).toHexString({ precision: 'DOUBLE' })

        expect(hex).toBe('4148A9593798A2B0')


    });


    it('Should return bytes, from decimal', async function () {
        let bytes = converter(422).toBytes();

        expect(bytes[0]).toBe('00000001')//most significant byte!
        expect(bytes[1]).toBe('10100110')

        expect(bytes.length).toBe(2)

        bytes = converter(422).toBytes({ endianness: 'LITTLE' });

        expect(bytes[0]).toBe('10100110')
        expect(bytes[1]).toBe('00000001')//most significant byte!

        bytes = converter(256).toBytes({ endianness: 'LITTLE' });

        expect(bytes[0]).toBe('00000000')
        expect(bytes[1]).toBe('00000001')//most significant byte!


        bytes = converter(534545).toBytes();

        expect(bytes[0]).toBe('00001000')//most significant byte!
        expect(bytes[1]).toBe('00101000')
        expect(bytes[2]).toBe('00010001')

        bytes = converter(-534545).toBytes();
        expect(bytes[0]).toBe('11111111')//most significant byte!
        expect(bytes[1]).toBe('11110111')
        expect(bytes[2]).toBe('11010111')
        expect(bytes[3]).toBe('11101111')


        bytes = converter(-143454544).toBytes();//
        // [       "11110111",        "01110011",       "00001110",       "10110000"     ]
        expect(bytes[0]).toBe('11110111')//most significant byte!
        expect(bytes[1]).toBe('01110011')
        expect(bytes[2]).toBe('00001110')
        expect(bytes[3]).toBe('10110000')


    });

    it('Should return bytes, from hex', async function () {
        let bytes = converter(0x1A6).toBytes();

        expect(bytes[0]).toBe('00000001')//most significant byte!
        expect(bytes[1]).toBe('10100110')

        expect(bytes.length).toBe(2)

        bytes = converter(0x1A6).toBytes({ endianness: 'LITTLE' });

        expect(bytes[0]).toBe('10100110')
        expect(bytes[1]).toBe('00000001')//most significant byte!

        bytes = converter(0x100).toBytes({ endianness: 'LITTLE' });

        expect(bytes[0]).toBe('00000000')
        expect(bytes[1]).toBe('00000001')//most significant byte!


        bytes = converter(0x82811).toBytes();

        expect(bytes[0]).toBe('00001000')//most significant byte!
        expect(bytes[1]).toBe('00101000')
        expect(bytes[2]).toBe('00010001')

        bytes = converter(-0x82811).toBytes();
        expect(bytes[0]).toBe('11111111')//most significant byte!
        expect(bytes[1]).toBe('11110111')
        expect(bytes[2]).toBe('11010111')
        expect(bytes[3]).toBe('11101111')


        bytes = converter(-0x88CF150).toBytes();//
        // [       "11110111",        "01110011",       "00001110",       "10110000"     ]
        expect(bytes[0]).toBe('11110111')//most significant byte!
        expect(bytes[1]).toBe('01110011')
        expect(bytes[2]).toBe('00001110')
        expect(bytes[3]).toBe('10110000')


    });

    it('Should return bytes, from octal', async function () {
        let bytes = converter(0o646).toBytes();

        expect(bytes[0]).toBe('00000001')//most significant byte!
        expect(bytes[1]).toBe('10100110')

        expect(bytes.length).toBe(2)

        bytes = converter(0o646).toBytes({ endianness: 'LITTLE' });

        expect(bytes[0]).toBe('10100110')
        expect(bytes[1]).toBe('00000001')//most significant byte!        

    });

    it('Should return byte decimals, from decimal', async function () {
        let bytes = converter(422).toDecimalBytes();

        expect(bytes[0]).toBe(1)//most significant byte!
        expect(bytes[1]).toBe(166)//

        expect(bytes.length).toBe(2)

        bytes = converter(422).toDecimalBytes({ endianness: 'LITTLE' });

        expect(bytes[0]).toBe(166)
        expect(bytes[1]).toBe(1)//most significant byte!

        bytes = converter(256).toDecimalBytes({ endianness: 'LITTLE' });

        expect(bytes[0]).toBe(0)
        expect(bytes[1]).toBe(1)//most significant byte!


        bytes = converter(534545).toDecimalBytes();

        expect(bytes[0]).toBe(8)//most significant byte!
        expect(bytes[1]).toBe(40)
        expect(bytes[2]).toBe(17)


        bytes = converter(-534545).toDecimalBytes();
        expect(bytes[0]).toBe(255)//most significant byte!
        expect(bytes[1]).toBe(247)
        expect(bytes[2]).toBe(215)
        expect(bytes[3]).toBe(239)


        bytes = converter(-143454544).toDecimalBytes();

        expect(bytes[0]).toBe(247)//most significant byte!
        expect(bytes[1]).toBe(115)
        expect(bytes[2]).toBe(14)
        expect(bytes[3]).toBe(176)


    });

    it('Should return byte decimals, from hex', async function () {
        let bytes = converter(0x1A6).toDecimalBytes();

        expect(bytes[0]).toBe(0x1)//most significant byte!
        expect(bytes[1]).toBe(0xA6)//

        expect(bytes.length).toBe(2)

        bytes = converter(0x1A6).toDecimalBytes({ endianness: 'LITTLE' });

        expect(bytes[0]).toBe(0xA6)
        expect(bytes[1]).toBe(1)//most significant byte!

        bytes = converter(0x100).toDecimalBytes({ endianness: 'LITTLE' });

        expect(bytes[0]).toBe(0)
        expect(bytes[1]).toBe(1)//most significant byte!


        bytes = converter(0x82811).toDecimalBytes();

        expect(bytes[0]).toBe(8)//most significant byte!
        expect(bytes[1]).toBe(40)
        expect(bytes[2]).toBe(17)


        bytes = converter(-0x82811).toDecimalBytes();
        expect(bytes[0]).toBe(255)//most significant byte!
        expect(bytes[1]).toBe(247)
        expect(bytes[2]).toBe(215)
        expect(bytes[3]).toBe(239)


        bytes = converter(-0x88CF150).toDecimalBytes();

        expect(bytes[0]).toBe(247)//most significant byte!
        expect(bytes[1]).toBe(115)
        expect(bytes[2]).toBe(14)
        expect(bytes[3]).toBe(176)


    });

    it('Should return byte decimals, from octal', async function () {
        let bytes = converter(0o646).toDecimalBytes();

        expect(bytes[0]).toBe(1)//most significant byte!
        expect(bytes[1]).toBe(166)//

        expect(bytes.length).toBe(2)


    });

    it('Should return bytes, from float', async function () {
        let bytes = converter(1.1).toBytes();

        // ["00111111", "10001100", "11001100", "11001101"]
        expect(bytes).toStrictEqual(["11001101", "11001100", "10001100", "00111111"])//little enddian!



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

    it('Should return binary, from hex', async function () {//*
        let binary = converter(0x296C167).toBinary()
        expect(binary).toBe('10100101101100000101100111')

        binary = converter(0x3ede61d0).toBinary()
        expect(binary).toBe('111110110111100110000111010000')

        binary = converter(0xbede61d0).toBinary()
        expect(binary).toBe('10111110110111100110000111010000')

        binary = converter(0x440863d7).toBinary()
        expect(binary).toBe('1000100000010000110001111010111')

        binary = converter(0xc40863d7).toBinary()
        expect(binary).toBe('11000100000010000110001111010111')

    });

    it('Should return binary, from double precision float', async function () {
        let binary = converter(-0.32323).toBinary({ precision: 'DOUBLE' })
        expect(binary).toBe('1011111111010100101011111100110011100001110001011000001001010110')

        binary = converter(555555.6565656565656565666).toBinary({ precision: 'DOUBLE' })
        expect(binary).toBe('0100000100100000111101000100011101010000001010010101111110101101')

    });


    it('Should return float, from Number', async function () {
        let float = converter(0x296C167).toFloat()
        expect(float.toString()).toContain('2.21515265')
        expect(float.toString()).toContain('e-37')


        float = converter(0x3ede61d0).toFloat()
        expect(float.toString()).toContain('0.43434000015')

        float = converter(0b00111110110111100110000111010000).toFloat()
        expect(float.toString()).toContain('0.43434000015')

        float = converter(0o7667460720).toFloat()
        expect(float.toString()).toContain('0.43434000015')

        float = converter(0xbede61d0).toFloat()
        expect(float.toString()).toContain('-0.43434000015')

    });

    it('Should return double precision float, from Number', async function () {
        let float = converter(0x4001B8A1D57211EAn).toFloat({ precision: 'DOUBLE' })
        expect(float).toBe(2.2151524234234232)

        float = converter(0xFFE1CCF385EBC8A0n).toFloat({ precision: 'DOUBLE' })
        expect(float).toBe(-1e+308)   
        
        float = converter(0o1777416317160572744240n).toFloat({ precision: 'DOUBLE' })
        expect(float).toBe(-1e+308)   

        float = converter(0b1111111111100001110011001111001110000101111010111100100010100000n).toFloat({ precision: 'DOUBLE' })
        expect(float).toBe(-1e+308)


    });

    it('Should return decimal, from Number', async function () {
        let decimal = converter(0x296C167).toInteger()
        expect(decimal).toBe(43434343)

        decimal = converter(0x3ede61d0).toInteger()
        expect(decimal).toBe(1054761424)

        decimal = converter(0xbede61d0).toInteger()
        expect(decimal).toBe(3202245072)

        decimal = converter(0xFFF4).toInteger()
        expect(decimal).toBe(65524)

        decimal = converter(0o177764).toInteger()
        expect(decimal).toBe(65524)
        
        decimal = converter(0b1111111111110100).toInteger()
        expect(decimal).toBe(65524)

    });

    it('Should return decimal, from octal', async function () {
        let decimal = converter(0o245540547).toInteger()
        expect(decimal).toBe(43434343)

        decimal = converter(0o7667460720).toInteger()
        expect(decimal).toBe(1054761424)

        decimal = converter(0o434157115760177777n).toInteger()
        expect(decimal).toBe(9999999999999999)

    });

    it('Should return decimal, from binary', async function () {
        let decimal = converter(0b100111100000101000100001000110111111).toInteger()
        expect(decimal).toBe(42423423423)

    });

    it('Should return decimal, from other notations, signed convention', async function () {
        let decimal = converter(0xFFF4).toInteger({isSigned:true})
        expect(decimal).toBe(-12)

        decimal = converter(0x00000000BEDE61D0).toInteger({isSigned:true})
        expect(decimal).toBe(-1092722224) 

        decimal = converter(0o27667460720).toInteger({isSigned:true})
        expect(decimal).toBe(-1092722224) 

        decimal = converter(0b10111110110111100110000111010000).toInteger({isSigned:true})
        expect(decimal).toBe(-1092722224) 

        decimal = converter(-0xFF).toInteger()
        expect(decimal).toBe(-255) 

    });






})




