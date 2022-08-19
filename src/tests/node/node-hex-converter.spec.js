const { expect } = require('expect');
const converter = require('../../../build/cjs/converter').default;




describe('Node HexConverter tests', () => {

    it('Should return binary, from hex', async function () {
        let binary = converter('296C167').toBinary()
        expect(binary).toBe('10100101101100000101100111')

        binary = converter('3ede61d0').toBinary()
        expect(binary).toBe('111110110111100110000111010000')

        binary = converter('bede61d0').toBinary()
        expect(binary).toBe('10111110110111100110000111010000')

        binary = converter('440863d7').toBinary()
        expect(binary).toBe('1000100000010000110001111010111')

        binary = converter('c40863d7').toBinary()
        expect(binary).toBe('11000100000010000110001111010111')



    });   

    it('Should return decimal, from hex', async function () {
        let decimal = converter('296C167').toDecimal()
        expect(decimal).toBe(43434343)

        decimal = converter('0x3ede61d0').toDecimal()
        expect(decimal).toBe(1054761424)

        decimal = converter('bede61d0').toDecimal()
        expect(decimal).toBe(3202245072)

        decimal = converter('FFF4').toDecimal({isSigned:false})
        expect(decimal).toBe(65524)

    });

    it('Should decimal, from hex, signed convention', async function () {
        let decimal = converter('FFF4').toDecimal({isSigned:true})
        expect(decimal).toBe(-12)

        decimal = converter('00000000BEDE61D0').toDecimal({isSigned:true})
        expect(decimal).toBe(-1092722224) 

    });


    it('Should return float, from hex', async function () {
        let binary = converter('296C167').toFloat()
        expect(binary.toString()).toContain('2.215152')
        

        binary = converter('0x3ede61d0').toFloat()
        expect(binary.toString()).toContain('0.43434000015')

        binary = converter('bede61d0').toFloat()
        expect(binary.toString()).toContain('-0.43434000015')

    });

})




