import { expect } from "expect";
import converter from "../../converter";
import { getDecimalBytes } from "./test-utils";

describe('Node DecimalBytesConverter tests', () => {     

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
        var int8 = converter(bytes).toInt8Array()//
        expect(int8 instanceof Int8Array).toBe(true)
        expect(int8[0]).toBe(-127)
        expect(int8[1]).toBe(119)
        expect(int8[2]).toBe(-1)

    });

    it('Should return Uint16Array, and an Int16Array, from byte decimals', async function () {
        var bytes = [255,255, 0,0]
        var uint16 = converter(bytes).toUint16Array()
        expect(uint16 instanceof Uint16Array).toBe(true)
        expect(uint16[0]).toBe(65535)
        expect(uint16[1]).toBe(0)
  
        // var bytes = [255,255, 247, 247, 128, 0]
        var bytes = [-127,-127, 120, 120, 120, 0]
        var int16 = converter(bytes).toInt16Array()
      
        expect(int16 instanceof Int16Array).toBe(true)
        expect(int16[0]).toBe(-32383)
        expect(int16[1]).toBe(30840)
        expect(int16[2]).toBe(120)

    


        var bytes = [-127,-127, -1, 2]
        //11111111111111111111111110000001,11111111111111111111111110000001,11111111111111111111111111111111,10
        //10000001,10000001,11111111,00000010
        var int16 = converter(bytes).toInt16Array()
     
        // console.log(int16)
        expect(int16 instanceof Int16Array).toBe(true)
        expect(int16[0]).toBe(-32383)
        expect(int16[1]).toBe(767)
    

        var bytes = [-45,-40, -20, -21]
        var int16 = converter(bytes).toInt16Array()
      
        expect(int16 instanceof Int16Array).toBe(true)
        expect(int16[0]).toBe(-10029)
        expect(int16[1]).toBe(-5140)


    });
    

    it('Should return an Int32Array, from byte decimals', async function () {

        // var bytes = ['10000000', '00000000', '00000000', '00000000', '11110111', '11110111', '11110111', '11110111', '01110111', '01110111', '01110111', '01110111']
        // var bytes = [128, 0,0,0, 247, 247, 247, 247, 119, 119, 119, 119]
        let bytes = [120,-2,0,0]
        var int32 = converter(bytes).toInt32Array()
        expect(int32 instanceof Int32Array).toBe(true)
        expect(int32[0]).toBe(65144)
        // expect(int32[1]).toBe(-134744073)
        // expect(int32[2]).toBe(2004318071)

        bytes = [-127, -127,-127,0]
        var int32 = converter(bytes).toInt32Array()
        expect(int32 instanceof Int32Array).toBe(true)
        expect(int32[0]).toBe(8487297)

    });

    it('Should return a Uint32Array, from byte decimals', async function () {

        var bytes = [119, 119, 119, 1]
        var uInt32 = converter(bytes).toUint32Array()
        expect(uInt32 instanceof Uint32Array).toBe(true)
        expect(uInt32.length).toBe(1)
        expect(uInt32[0]).toBe(24606583)


    });

    
    it('Should return a "ΆΆ" string, from byte decimals', async function () {
        var bytes = [206, 134, 206, 134]
        var text = converter(bytes).toText()
        expect(text).toBe('ΆΆ')

    });
   


    it('Should return a Blob, from byte decimals', async function () {
        const bytes = getDecimalBytes()
        var blob = await converter(bytes).toBlob()
        expect(blob instanceof Blob).toBe(true)
        expect(blob.size === bytes.length).toBe(true)
    });

     

    it('Should return an array of hex, from an array of byte decimals', async function () {
        var bytes = [212, 252, 136] //-44,-4,-120 decimals in twos complement
        var hexes = converter(bytes).toHexString()
        expect(hexes[0]).toBe('D4')
        expect(hexes[1]).toBe('FC')
        expect(hexes[2]).toBe('88')
        // console.log('hexes', hexes)


        var hexes = converter(bytes).toHexString()
    
        expect(hexes[0][hexes[0].length - 1]).toBe('4')
        expect(hexes[0][hexes[0].length - 2]).toBe('D')

        expect(hexes[1][hexes[1].length - 1]).toBe('C')
        expect(hexes[1][hexes[1].length - 2]).toBe('F')
        expect(hexes[2]).toBe('88')//Inquire this !
        // console.log('hexes', hexes)

    });

    it('Should return an array of hex, from an array of bytes', async function () {
        var bytes = [212, 252, 136] //-44,-4,-120 decimals in twos complement
        var hexes = converter(bytes).toHexString()
        expect(hexes[0]).toBe('D4')
        expect(hexes[1]).toBe('FC')
        expect(hexes[2]).toBe('88')
        // console.log('hexes', hexes)


        var hexes = converter(bytes).toHexString()
    
        expect(hexes[0][hexes[0].length - 1]).toBe('4')
        expect(hexes[0][hexes[0].length - 2]).toBe('D')

        expect(hexes[1][hexes[1].length - 1]).toBe('C')
        expect(hexes[1][hexes[1].length - 2]).toBe('F')
        expect(hexes[2]).toBe('88')//Inquire this !
        // console.log('hexes', hexes)

    });
    


    // it('Should return a Float32Array, from bytes', async function () {
    //     var bytes = [66, 10, 68, 156, 66, 26, 68, 156]
    //     // '01000010000010100100010010011100','01000010000110100100010010011100'
    //     var float32 = converter(bytes).toFloat32Array()
    //     expect(float32[0].toString().includes('34.5670013')).toBe(true)
    //     expect(float32[1].toString().includes('38.5670013')).toBe(true)


    //     var bytes = [194, 10, 68, 156]
    //     // '11000010000010100100010010011100'
    //     var float32 = converter(bytes).toFloat32Array()
    //     expect(float32[0].toString().includes('-34.5670013')).toBe(true)

    //     var bytes = [63, 17, 39, 0]
    //     // 00111111000100010010011100000000
    //     var float32 = converter(bytes).toFloat32Array()
    //     expect(float32[0].toString().includes('0.5670013')).toBe(true)

    //     var bytes = [191, 17, 39, 0]
    //     // 10111111000100010010011100000000
    //     var float32 = converter(bytes).toFloat32Array()
    //     expect(float32[0].toString().includes('-0.5670013')).toBe(true)

    //     var bytes = [-127, -127, -127, 1]
    //     // 10111111000100010010011100000001
    //     var float32 = converter(bytes).toFloat32Array()
    //     expect(float32[0].toString().includes('-4.757222')).toBe(true)


    // });

    
    // const bytes = ['11111111', '11111111', '11110111']

//   const decimals = converter(bytes).toIntegers({isSigned:true})//Can be signed or unsigned. You can also assert the integer size(Default is 8)
    // console.log('yoyo',decimals)



})




