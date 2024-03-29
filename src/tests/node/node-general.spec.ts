
import { Blob } from 'node:buffer';
import { expect } from "expect";
import converter from "../../converter";
import BlobConverter from "../../converters/BlobConverter";
import { getSystemEndianness } from '../../utils/crossPlatform';


describe('Node general tests', () => {

    it('Should return an Int8Array, from Uint8Array', async function () {
        this.timeout(0);
        const uint8 = new Uint8Array([206, 134])
        const int8 = converter(uint8).toInt8Array()
        expect(int8 instanceof Int8Array).toBe(true)
        expect(new TextDecoder().decode(int8)).toBe('Ά')//

    });

    it('Should return a Uint8Array, from Int8Array', async function () {

        const int8 = new Int8Array([-50, -122])
        const uint8 = converter(int8).toUint8Array()
        expect(uint8 instanceof Uint8Array).toBe(true)
        expect(new TextDecoder().decode(uint8)).toBe('Ά')

    });

    it('Should return an Int16Array, from Int8Array', async function () {//

        const int8 = new Int8Array([-50, -122])
        const int16 = converter(int8).toInt16Array()
        expect(int16 instanceof Int16Array).toBe(true)
        expect(int16[0]).toBe(-31026)

    });


    it('Should return a Float32Array, from Uint8Array', async function () {//

        const uint8 = new Uint8Array([50, 122,1, 0])
        //00110010 01111010 00000001 00000000
        //00000000000000010111101000110010
        const float32 = converter(uint8).toFloat32()

        expect(float32 instanceof Float32Array).toBe(true)
        expect(float32[0].toString().includes('1.356709147')).toBe(true)

    });

    it('Should return an "Ά" character, from Int8Array', async function () {

        const int8 = new Int8Array([-50, -122])
        const text = converter(int8).toText()
        expect(text).toBe('Ά')
    });

    it('Should return an "Ά" character, from Uint8Array', async function () {

        const int8 = new Uint8Array([206, 134])
        const text = converter(int8).toText()
        expect(text).toBe('Ά')
    });

    it('Should return a Blob, that is converted to "Ά", from Uint8Array', async function () {

        const uint8 = new Uint8Array([206, 134])
        const blob = await converter(uint8).toBlob();
        const text = await blob.text()
        expect(text).toBe('Ά')
    });

    it('Should return a Blob, that is converted to "Ά", from Int8Array', async function () {

        const int8 = new Int8Array([-50, -122])
        const blob = await converter(int8).toBlob();
        const text = await blob.text()
        expect(text).toBe('Ά')
    });

    it('Should return a dataUrl string from Blob', async function () {

        //@ts-ignore
        const blob = new Blob([206, 134])
        //@ts-ignore
        const blobConverter = new BlobConverter(blob)
        const url = await blobConverter.toBase64();

        expect(typeof url).toBe('string')
    });
   

    it('Should return bytes from Blob', async function () {

        //@ts-ignore
        const blob = new Blob([206])
        //@ts-ignore
        const blobConverter = new BlobConverter(blob)
        const bytes = await blobConverter.toBytes()
        expect(bytes.length).toBe(3)

    });

    // it('Should return decimal bytes from Blob', async function () {

    //     const blob = new Blob([1])
    //     const blobConverter = new BlobConverter(blob)
    //     const decimalBytes = await blobConverter.toDecimalBytes()
    //     expect(decimalBytes).toStrictEqual([206])

    // });

    it('Should return a Uint8Array, from an ArrayBuffer', async function () {

        const buffer = new ArrayBuffer(5)
        const uint8 = converter(buffer).toUint8Array()
        expect(uint8.constructor.name).toBe('Uint8Array')
        expect(uint8.buffer === buffer).toBe(true)
    });   

    it('Should return decimalBytes, from an ArrayBuffer', async function () {
        const int16 = new Int16Array([1,2,3])
        let decimals = converter(int16.buffer).toDecimalBytes()
        expect(decimals).toStrictEqual([1,0,2,0,3,0])

        let int8 = new Int8Array([-1,-2])
        decimals = converter(int8.buffer).toDecimalBytes()
        expect(decimals).toStrictEqual([255,254])

        const uint8 = new Uint8Array([255,254])
        decimals = converter(uint8.buffer).toDecimalBytes({isSigned:true})
        expect(decimals).toStrictEqual([-1,-2])
    });   
    
    it("Should return the system's endianness", async function () {

        const endianness = getSystemEndianness()
        expect(endianness === 'LITTLE' || endianness === 'BIG').toBe(true)
    });   


});

const uint16 = new Uint16Array([422]);
const uint8 = converter(uint16).toUint8Array()




