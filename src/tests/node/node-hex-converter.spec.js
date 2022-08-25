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
        let decimal = converter('296C167').toInteger()
        expect(decimal).toBe(43434343)

        decimal = converter('0x3ede61d0').toInteger()
        expect(decimal).toBe(1054761424)

        decimal = converter('bede61d0').toInteger()
        expect(decimal).toBe(3202245072)

        decimal = converter('FFF4').toInteger({isSigned:false})
        expect(decimal).toBe(65524)

    });

    it('Should decimal, from hex, signed convention', async function () {
        let decimal = converter('FFF4').toInteger({isSigned:true})
        expect(decimal).toBe(-12)

        decimal = converter('00000000BEDE61D0').toInteger({isSigned:true})
        expect(decimal).toBe(-1092722224) 

    });


    it('Should return float, from hex', async function () {
        let float = converter('296C167').toFloat()
        expect(float.toString()).toContain('2.21515265')
        expect(float.toString()).toContain('e-37')
        

        float = converter('0x3ede61d0').toFloat()
        expect(float.toString()).toContain('0.43434000015')

        float = converter('bede61d0').toFloat()
        expect(float.toString()).toContain('-0.43434000015')

    });

    it('Should return double precision float, from hex', async function () {
        let float = converter('4001B8A1D57211EA').toFloat({precision:'DOUBLE'})
        expect(float).toBe(2.2151524234234232)
        
        float = converter('FFE1CCF385EBC8A0').toFloat({precision:'DOUBLE'})  
        expect(float).toBe(-1e+308)//Different value from binaryToHex due to conversion from hex to binary first. Needs to be reasearched.        


    });

})




