import { expect } from 'expect';
import converter from '../../build/converter.js';
import { TextDecoder } from 'util'
import { Blob } from 'node:buffer'


describe('Node tests', () => {

    it('Should return an Int8Array, from Uint8Array', async function () {
        this.timeout(0);
        const uint8 = new Uint8Array([206, 134])
        const int8 = converter(uint8).toInt8Array()
        expect(int8 instanceof Int8Array).toBe(true)
        expect(new TextDecoder().decode(int8)).toBe('Ά')

    });

    it('Should return a Uint8Array, from Int8Array', async function () {

        const int8 = new Int8Array([-50, -122])
        const uint8 = converter(int8).toUint8Array()
        expect(uint8 instanceof Uint8Array).toBe(true)
        expect(new TextDecoder().decode(uint8)).toBe('Ά')

    });

    it('Should return an Int16Array, from Int8Array', async function () {

        const int8 = new Int8Array([-50, -122])
        const int16 = converter(int8).toInt16Array()
        expect(int16 instanceof Int16Array).toBe(true)

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

        const int8 = new Uint8Array([206, 134])
        const text = await converter(int8).toBlob().text()
        expect(text).toBe('Ά')
    });

    it('Should return a Blob, that is converted to "Ά", from Int8Array', async function () {

        const int8 = new Int8Array([-50, -122])
        const text = await converter(int8).toBlob().text()
        expect(text).toBe('Ά')
    });

    it('Should return a dataUrl string from Blob', async function () {

        const blob = new Blob([206, 134])
        const url = await converter(blob).toBase64();
        console.log(url)
        expect(typeof url).toBe('string')
    });




})

