import { expect } from "expect";
import HexStringConverter from "../../converters/HexStringConverter";

 
const converter = HexStringConverter


describe('Node HexStringConverter tests', () => {

    it('Should return binary, from hex', async function () {
        let binary = new converter('296C167').toBinary()
        expect(binary).toBe('10100101101100000101100111')

        binary = new converter('3ede61d0').toBinary()
        expect(binary).toBe('111110110111100110000111010000')

        binary = new converter('bede61d0').toBinary()
        expect(binary).toBe('10111110110111100110000111010000')

        binary = new converter('440863d7').toBinary()
        expect(binary).toBe('1000100000010000110001111010111')

        binary = new converter('c40863d7').toBinary()
        expect(binary).toBe('11000100000010000110001111010111')



    });   

    it('Should return decimal, from hex', async function () {
        let decimal = new converter('296C167').toInteger()
        expect(decimal).toBe(43434343)

        decimal = new converter('0x3ede61d0').toInteger()
        expect(decimal).toBe(1054761424)

        decimal =new  converter('bede61d0').toInteger()
        expect(decimal).toBe(3202245072)

        decimal =new converter('FFF4').toInteger({isSigned:false})
        expect(decimal).toBe(65524)

    });

    it('Should decimal, from hex, signed convention', async function () {
        let decimal = new converter('FFF4').toInteger({isSigned:true})
        expect(decimal).toBe(-12)

        decimal =new  converter('00000000BEDE61D0').toInteger({isSigned:true})
        expect(decimal).toBe(-1092722224) 

    });


    it('Should return float, from hex string', async function () {
        let float = new converter('296C167').toFloat()
        expect(float.toString()).toContain('2.21515265')
        expect(float.toString()).toContain('e-37')
        

        float = new converter('0x3ede61d0').toFloat()
        expect(float.toString()).toContain('0.43434000015')

        float = new converter('bede61d0').toFloat()
        expect(float.toString()).toContain('-0.43434000015')

    });

    it('Should return double precision float, from hex', async function () {
        let float = new converter('4001B8A1D57211EA').toFloat({precision:'DOUBLE'})
        expect(float).toBe(2.2151524234234232)
        
        float = new converter('FFE1CCF385EBC8A0').toFloat({precision:'DOUBLE'})  
        expect(float).toBe(-1e+308)      


    });

})




