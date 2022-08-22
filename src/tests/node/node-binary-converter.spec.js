const { expect } = require('expect');
const {BinaryConverter} = require('../../../build/cjs');
const converter = BinaryConverter



describe('Node BinaryConverter tests', () => {

    

    it('Should return decimal, from binary', async function () {
        
        let decimal = new converter('0010100101101100000101100111').toInteger()
        expect(decimal).toBe(43434343)

        decimal = new converter('00111110110111100110000111010000').toInteger()
        expect(decimal).toBe(1054761424)

        decimal = new converter('10111110110111100110000111010000').toInteger()
        expect(decimal).toBe(3202245072)

        decimal = new converter('1111111111110100').toInteger({isSigned:false})
        expect(decimal).toBe(65524)

    });

    it('Should return decimal, from binary, signed convention', async function () {
        let decimal =new  converter('1111111111110100').toInteger({isSigned:true})
        expect(decimal).toBe(-12)

        decimal = new converter('10111110110111100110000111010000').toInteger({isSigned:true})
        expect(decimal).toBe(-1092722224) 

    });


    it('Should return float, from binary', async function () {
        let float = new converter('0010100101101100000101100111').toFloat()
        expect(float.toString()).toContain('2.215152')
        

        float = new converter('00111110110111100110000111010000').toFloat()
        expect(float.toString()).toContain('0.43434000015')

        float = new converter('10111110110111100110000111010000').toFloat()
        expect(float.toString()).toContain('-0.43434000015')

    });

    it('Should return hex, from binary', async function () {
        
        let binary = new converter('10100101101100000101100111').toHex()
        expect(binary).toBe('296C167')
        // 111110110111100110000111010000
        binary = new converter('111110110111100110000111010000').toHex()
        expect(binary).toBe('3EDE61D0')

       


    }); 


})




