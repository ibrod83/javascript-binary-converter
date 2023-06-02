import { expect } from "expect";
import converter from "../../converter";


describe('Node StringConverter tests', () => {

    it('Should return binary, from string', async function () {
        let binary = converter('A').toBinary()
        expect(binary).toBe('01000001')  

        binary = converter('A A').toBinary()
        expect(binary).toBe('010000010010000001000001') 

        binary = converter(`A\nA`).toBinary()
        expect(binary).toBe('010000010000101001000001') 

        binary = converter('💜').toBinary()
        expect(binary).toBe('11110000100111111001001010011100')        
    });   


    it('Should return uint8Array, from string', async function () {
        const uint8 = converter(`A\nA`).toUint8Array()
        const arrayFromUint8 = Array.from(uint8)
        expect(arrayFromUint8).toStrictEqual([65,10,65]) 
      
    });    

})




