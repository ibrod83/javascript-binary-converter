
var expect = chai.expect;
import converter from '../../build/dev/converter.js'
import { imageToCanvas, imageToBlob } from '../../build/dev/utils/image.js';


describe('Browser tests', () => {

    it('Should return an Int8Array, from Uint8Array', async function () {
        this.timeout(0);//
        const uint8 = new Uint8Array([206, 134])
        const int8 = converter(uint8).toInt8Array()
        expect(int8 instanceof Int8Array).to.equal(true)
        expect(new TextDecoder().decode(int8)).to.equal('Ά')

    });

    it('Should return a Uint8Array, from Int8Array', async function () {

        const int8 = new Int8Array([-50, -122])
        const uint8 = converter(int8).toUint8Array()
        expect(uint8 instanceof Uint8Array).to.equal(true)
        expect(new TextDecoder().decode(uint8)).to.equal('Ά')

    });

    it('Should return a Blob, that is converted to "Ά", from Uint8Array', async function () {

        const int8 = new Uint8Array([206, 134])
        const text = await converter(int8).toBlob().text()
        expect(text).to.equal('Ά')
    });

    it('Should return a Blob, that is converted to "Ά", from Int8Array', async function () {

        const int8 = new Int8Array([-50, -122])
        const text = await converter(int8).toBlob().text()
        expect(text).to.equal('Ά')
    });


    it('Should return an image, from a file', async function () {
        const { imageFromDom, blob, file } = await createObjectsForFileDummyTests('#Koala')

        const image = await converter(file).toImage({ validateImage: false })//Create an image from "file"

        const blobFromImage = await imageToBlob(image, { height: imageFromDom.height, width: imageFromDom.width },{type:'image/png'})//Create blob again, just to verify the size.
        expect(file.size).to.equal(1780070)

        const imageFromBlob =await  converter(blobFromImage).toImage()
        imageFromBlob.id = 'koala-from-blob'
        document.body.appendChild(imageFromBlob)

        const koalaFromBlob = document.querySelector('#koala-from-blob');

        expect(koalaFromBlob.width).to.equal(1024)
        if (![blob.size, file.size, blobFromImage.size].every((v, i, a) =>
            v === a[0]
        )) {
            // Check that all sizes are identical
            throw new Error("Sizes of the three binary objects isn't identical")
        }
    });

    
    it('Should return a canvas, from a Blob', async function () {
        const { blob } = await createObjectsForFileDummyTests('#small')

        const canvas =await converter(blob).toCanvas();
        document.body.appendChild(canvas)
        expect(canvas instanceof HTMLCanvasElement).to.equal(true)
        expect(canvas.width === 24 && canvas.height === 29).to.equal(true)
    });

    it('Should return a dataUrl string from Blob', async function () {

        const imageFromDom = document.querySelector('#small')//Take the original hidden image from the DOM.
        const blobFromImage = await imageToBlob(imageFromDom, { height: imageFromDom.height, width: imageFromDom.width },{type:'image/png'})//Create blob again, just to verify the size.
        const dataUrl = await converter(blobFromImage).toBase64({appendDataUrl:true}); 
        const image = document.createElement('img')
        image.src = dataUrl
        document.body.appendChild(image)
        expect(image.src.includes('data:image/png;base64,')).to.equal(true)

    });

    it('Should return a dataUrl string from File', async function () {

        const { file } = await createObjectsForFileDummyTests('#small')
        const dataUrl = await converter(file).toBase64({appendDataUrl:true});
        expect(dataUrl.includes('base64,')).to.equal(true)

    });

    
    it('Should return a plain dataUrl string from File', async function () {

        const { file } = await createObjectsForFileDummyTests('#small')
        const dataUrl = await converter(file).toBase64();
        expect(typeof dataUrl === 'string').to.equal(true)
        expect(dataUrl.includes('base64,')).to.equal(false)

    });

    it('Should return an arrayBuffer, from a file', async function () {

        const { file } = await createObjectsForFileDummyTests('#Koala')

        const arrayBuffer = await converter(file).toArrayBuffer()
        expect(arrayBuffer.byteLength).to.equal(1780070)
        // debugger;


    });

    it('Should return a Uint8Array, from a file', async function () {

        const { file } = await createObjectsForFileDummyTests('#Koala')

        const uint8 = await converter(file).toUint8Array()
        expect(uint8.byteLength).to.equal(1780070)
        // debugger;


    });

    it('Should return an Int8Array, from a file', async function () {

        const { file } = await createObjectsForFileDummyTests('#Koala')

        const int8 = await converter(file).toInt8Array()
        expect(int8.byteLength).to.equal(1780070)
        // debugger;


    });

    it('Should return an Image, from an ArrayBuffer', async function () {

        const uint8 = new Uint8Array(dummyImageBytes)
        const buffer  = uint8.buffer

        const image =await converter(buffer).toImage()

        // document.body.appendChild(image)
    });

    it('Should return an Image, from a Uint8Array', async function () {

        const uint8 = new Uint8Array(dummyImageBytes)    

        const image =await converter(uint8).toImage({maxSize:10})

        expect(image instanceof HTMLImageElement).to.equal(true)
        expect(image.height).to.equal(10)
    });

    it('Should return a Uint8Array, from an ArrayBuffer', async function () {

        const buffer = new ArrayBuffer(5)
        const uint8 = converter(buffer).toUint8Array()
        expect(uint8.constructor.name).to.equal('Uint8Array')
        expect(uint8.buffer === buffer).to.equal(true)
    });

    it('Should return a Blob, from an Image', async function () {

        const {imageFromDom,blob:originalBlob} = await createObjectsForFileDummyTests('#small');
        const blob = await converter(imageFromDom).toBlob();
        const imageFromBlob = await converter(blob).toImage()//
        document.body.appendChild(imageFromBlob)
        expect(blob.size === originalBlob.size).to.equal(true)
        expect(imageFromBlob instanceof HTMLImageElement).to.equal(true)
        // debugger;
    });

    it('Should return a Uint8Array and an Int8Array, from an Image', async function () {

        const {imageFromDom,blob} = await createObjectsForFileDummyTests('#small');
        const uint8 = await converter(imageFromDom).toUint8Array()
        expect(uint8.byteLength).to.equal(blob.size) 
        const int8 = await converter(imageFromDom).toInt8Array()
        expect(int8 instanceof Int8Array).to.equal(true)
        expect(int8.byteLength).to.equal(blob.size) 
    });

    it('Should return a canvas, from an Image', async function () {

        var {imageFromDom} = await createObjectsForFileDummyTests('#small');
        var canvas = converter(imageFromDom).toCanvas()//
        expect(canvas instanceof HTMLCanvasElement).to.equal(true)
        expect(canvas.width === imageFromDom.width && canvas.height === imageFromDom.height).to.equal(true)

        var {imageFromDom} = await createObjectsForFileDummyTests('#small');
        var canvas = converter(imageFromDom).toCanvas({height:1,width:1})//
        expect(canvas instanceof HTMLCanvasElement).to.equal(true)
        expect(canvas.width === 1 && canvas.height === 1).to.equal(true)
    //    debugger
    });

    it('Should return an ArrayBuffer, from an Image', async function () {

        var {imageFromDom,blob} = await createObjectsForFileDummyTests('#small');
        var buffer = await converter(imageFromDom).toArrayBuffer()//
        expect(buffer.byteLength === blob.size).to.equal(true)       

    });

    
})
const dummyImageBytes = [ 137,80,78,71,13,10,26,10,0,0,0,13, 73,72,68,82,0,0,0,24,0,0,0,29,8,6 ,0,0,0,176,186,172,75,0,0,0,1,115, 82,71,66,0,174,206,28,233,0,0,7,180, 73,68,65,84,72,75,37,150,107,111,92, 87,21,134,159,189,207,125,238,55,219,99,123,60,25, 39,78,82,187,73,83,26,26,183,106,128,148,74,64,133, 40,23,193,7,64,66,72,252,0,126,64,251,39,248,15,124,64,168,240, 9,62,208,66,75,90,210,162,134,75,155,210,92,156,198,151,56,142,61,246,204,196,51,115,102,206, 253,108,116,156,45,45,109,105,75,75,123,105,189,239,122,223,37,118,191,134,138,12,88,126,245,50,190, 215,71,35,64,122,1,154,171,8,246,92,252,174,98,58,138,169,204,20,24,15,39,88,84,232,143,93,140,102,158, 197,213,121,100,67,35,141,166,132,161,192,118,10,4,81,128,229,20,137,99,3,41,109,196,189,117,212,153,11,109,84,85,67,216,160,57,6,244,198,60,185,223,197,63,72,9,159,128,72,64,24,32,4,12,122,240,220,149,21,186,225,128,198,114,131,88,155,162,164,66,8,27,203,201,225,133,30,74,24,104,90,145,48,4,113,255,154,80,43,175,190,196,164,183,129,153,55,208,149,142,240,76,188,251,46,221,47,123,132,83,133,0,198,174,98,161,173,211,188,116,158,221,173,219,148,150,234,148,230,202,76,38,99,52,195,192,52,243,104,229,50,84,242,224,122,132,174,66,106,14,226,139,107,168,181,245,139,4,193,99,172,162,77,50,77,208,162,50,238,231,46,59,183,31,51,241,20,81,4,175,92,61,13,118,66,223,239,162,242,138,198,169,89,98,161,240,167,33,82,51,200,149,170,248,158,139,210,19,156,82,5,180,18,164,58,162,255,139,166,170,205,148,72,213,49,210,18,144,10,8,202,236,254,189,139,244,45,118,143,186,92,121,121,21,153,186,116,143,247,48,103,109,236,154,133,83,203,51,157,76,9,3,65,165,58,11,121,135,196,27,162,217,10,28,7,148,3,154,141,240,127,189,172,80,33,166,17,33,244,148,48,142,49,197,44,183,222,222,192,140,29,78,173,181,8,210,33,97,48,64,207,41,106,157,57,40,219,68,227,62,169,146,152,70,149,241,36,3,214,196,202,9,66,53,34,21,10,187,56,71,26,166,136,244,205,51,42,244,38,88,166,4,34,166,193,148,156,217,228,193,159,55,153,246,20,245,182,67,170,123,228,43,26,197,70,1,125,174,65,58,117,145,82, 65,44,192,170,51,25,186,228,171,5,162,240,152,88,12,17,26,216,118,133,36,149,136,228,173,142, 138,252,41,86,150,160,18,34,161,48,194,60,71,255,236,51,220,243,200,213,5,86,77,67,175,10,202,237,89,208, 36,132,1,36,9,161,27,99,22,23,185,123,235,14,207,172,174,224,39,67,116,123,138,158,211,81,177,6,74,67,196,111,182,149,84,41,42,152,32,165,198,116,26,146,211,103,56,250,112,7,255,40,70,90,96,206,72,170,171,13,244,102,30,82,31,188,9,96,128,39,73,125,135,47,55,30,178,184,180,128,52,2,156,82,136,31,185,216,78,153,56,74,16,234,173,85,21,14,7,152,50,1,77,195,159,4,216,230,44,15,255,178,65,58,4,43,7,84,5,179,87,90,104,117,73,226,246,208,4,196,126,138,174,138,16,87,184,254,167,13,190,114,121,22,195,78,17,230,16,97,68,88,133,50,105,24,33,122,63,40,169,122,103,9,8,152,30,29,96,154,214,73,226,254,205,199,116,183,66,170,85,200,183,139,52,174,117,136,233,163,135,46,217,4,165,137,134,8,44,212,208,225,163,247,246,88,106,155,180,151,155,248,234,0,187,32,8,226,16,123,166,129,216,190,130,58,245,204,153,19,128,135,163,1,134,38,177,84,142,222,3,159,173,187,199,39,128,61,255,205,37,172,139,69,92,127,159,2,41,177,59,65,72,139,104,44,73,122,26,255,253,248,24,219,130,175,190,114,150,72,29,144,72,23,195,209,208,12,137,112,175,229,149,208,117,114,245,42,155,219,219,204,207,148,145,137,205,131,59,199,244,123,1,74,135,175,255,236,18,169,61,32,145,83,12,47,62,1,207,31,251,216,122,133,222,189,62,195,253,128,253,125,184,250,173,139,196,201,30,169,54,70,90,49,186,99,32,226,111,59,42,82,18,187,213,225,96,115,7,225,7,136,216,102,107,203,229,137,171,56,117,30,86,95,91,35,10,187,36,105,128,25,130,76,53,122,131,49,141,185,211,28,126,186,67,255,81,196,120,4,237,78,141,153,150,206,52,58,164,88,51,72,69,132,80,63,68,77,66,48,43,11,24,149,22,91,239,223,100,50,80,12,167,58,125,55,230,181,239,55,200,47,26,144,4,36,97,136,166,4,145,151,48,154,166,212,155,167,25,223,125,196,248,208,99,239,81,132,105,193,165,151,150,193,158,18,120,93,172,188,142,80,63,65,37,66,103,28,27,228,237,25,24,8,254,125,99,135,137,15,190,130,215,127,220,66,152,35,226,40,194,176,108,82,223,39,140,193,79,76,42,213,38,222,163,30,199,251,46,225,212,198,247,3,78,159,107,96,56,62,169,230,34,205,4,17,189,33,149,176,12,98,83,39,12,53,138,165,101,62,248,227,103,196,30,152,38,92,185,186,68,42,142,79,72,96,59,38,113,146,208,31,78,168,55,91,232,78,145,164,63,228,241,230,33,137,235,156,248,69,185,102,48,219,202,99,87,20,104,33,194,251, 30,202,174,150,240,35,15,187,80,99,120,16,225,13,36,55,111,244,88,168,11,206,102, 21,153,1,186,145,34,180,20,215,155,18,2,141,197,22,210,41,112,252,240,49,120,26,201, 212,98,227,206,1,197,18,60,251,92,139,72,100,12,140,16,193,79,133,18,66,98,216,14,96,227,63,129,112,108,242, 143,191,62,102,177,38,105,206,217,152,70,72,28,199,84,235,14,35,207,35,53,160,209,105,129,229,16,118,135,28,236,246, 104,159,123,158,135,183,55,216,127,232,178,182,86,195,41,1,25,200,241,175,76,37,148,68,234,54,164,22, 132,22,253,109,151,91,55,6,212,243,18,199,72,41,22,65,51,159,70,164,192,40,74,74,243,53,244,172,135,158,224,254,157,61,170,245,10,141,243,207,242,191,119,111,48,62,134,23,215,155,120,222,8,49,249,165,169,114,118,254,105,102,230,153,137,197,254,189,62,247,63,113,201,3,37,27,138,101,137,89,18,140,253,132,84,66,243,84,9,229,40,114,229,18,193,32,96,103,179,199,202,217,69,182,182,247,56,179,254,13,62,125,231,58,243,141,2,181,74,17,225,254,220,86,150,158,89,165,124,90,162,83,230,240,246,33,183,63,24,81,0,202,217,68,218,9,83,3,198,49,180,58,146,217,214,28,86,61,79,166,194,238,208,103,127,111,192,220,108,9,119,228,145,198,14,203,107,207,115,235,221,15,88,59,119,10,49,122,195,82,150,153,241,60,194,172,149,201,250,17,29,68,124,248,135,135,84,53,11,226,224,196,156,162,58,172,127,247,50,56,22,72,136,220,99,148,166,48,107,21,200,229,78,156,112,255,147,207,25,108,15,233,204,180,201,235,22,247,62,251,28,113,176,46,84,185,82,36,85,1,102,209,68,95,154,129,177,198,245,223,223,71,184,156,40,167,217,128,23,127,116,25,85,2,225,216,39,190,129,46,65,197,96,102,10,236,97,27,37,122,119,119,25,110,62,33,232,77,88,91,125,22,183,123,132,184,187,128,50,109,200,34,215,48,169,94,108,19,143,99,254,245,206,54,147,62,24,6,188,252,157,11,24,231,114,80,201,126,211,33,10,193,202,238,136,216,139,32,208,208,173,57,118,174,255,135,224,96,136,30,130,109,88,44,116,58,136,59,85,148,239,131,149,135,210,188,198,226,250,10,36,138,143,222,217,96,216,135,165,142,197,133,171,23,160,101,64,65,157,84,30,199,62,186,46,72,130,16,34,137,230,91,224,21,249,240,119,239,209,42,58,136,32,38,240,35,206,159,93,65,108,207,20,212,225,145,155,81,154,70,187,192,194,75,103,192,16,124,252,183,79,57,60,130,23,94,158,103,233,210,25,104,24,96,198,40,21,227,133,19,12,59,219,64,20,201,56,197,86,21,190,124,255,14,251,95,244,57,187,80,102,216,29,18,78,160,221,42,33,222,95,233,168,238,225,33,150,109,50,215,158,225,244,11,29,82,67,241,201,205,91,236,29,28,242,218,235,215,152,89,154,3,71,35,146,49,113,28,18,36,30,186,35,208,164,100,116,56,98,214,105,242,219,223,188,77,187,82,99,185,57,207,238,230,3,76,161,97,26,6,66,61,233,43,84,54,117,26,200,24,52,31,72,51,233,1,61,99,87,38,181,38,39,212,201,142,74,65,196,144,89,172,72,179,68,8,82,144,5,78,134,36,136,158,46,6,217,187,20,252,31,124,11,169,80,2,183,161,123,0,0,0,0,73,69,78,68,174,66,96,130 ]

const dummyImageBase64 = "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dHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpNaWNyb3NvZnRQaG90b18xXz0iaHR0cDovL25zLm1pY3Jvc29mdC5jb20vcGhvdG8vMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4YXBSaWdodHM6TWFya2VkPSJUcnVlIiB4YXBSaWdodHM6V2ViU3RhdGVtZW50PSJodHRwOi8vcHJvLmNvcmJpcy5jb20vc2VhcmNoL3NlYXJjaHJlc3VsdHMuYXNwP3R4dD00Mi0xNzE2NzIyMiZhbXA7b3BlbkltYWdlPTQyLTE3MTY3MjIyIiBleGlmOkV4aWZWZXJzaW9uPSIwMjIxIiBleGlmOlBpeGVsWERpbWVuc2lvbj0iMTAyNCIgZXhpZjpQaXhlbFlEaW1lbnNpb249Ijc2OCIgZXhpZjpDb2xvclNwYWNlPSI2NTUzNSIgZXhpZjpEYXRlVGltZURpZ2l0aXplZD0iMjAwOC0wMy0xNFQxMTozMTo0OC45OC0wNzowMCIgdGlmZjpPcmllbnRhdGlvbj0iMSIgdGlmZjpJbWFnZVdpZHRoPSIxMDI0IiB0aWZmOkltYWdlTGVuZ3RoPSI3NjgiIHRpZmY6UGhvdG9tZXRyaWNJbnRlcnByZXRhdGlvbj0iMiIgdGlmZjpTYW1wbGVzUGVyUGl4ZWw9IjMiIHRpZmY6WFJlc29sdXRpb249Ijk2LzEiIHRpZmY6WVJlc29sdXRpb249Ijk2LzEiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGNyczpBbHJlYWR5QXBwbGllZD0iVHJ1ZSIgcGhvdG9zaG9wOkxlZ2FjeUlQVENEaWdlc3Q9IjU3RkU3QjY2ODRCMUY1OERDMTM1QzgwQzFFMkYxNjdBIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iIiB4YXA6TWV0YWRhdGFEYXRlPSIyMDA5LTAyLTAyVDExOjQ0OjEwLTA4OjAwIiB4YXA6UmF0aW5nPSI0IiB4YXA6Q3JlYXRlRGF0ZT0iMjAwOC0wMy0xNFQyMDo1OToyNi41MzVaIiB4YXA6TW9kaWZ5RGF0ZT0iMjAwOC0wMy0xNFQxMTozMTo0OC45OC0wNzowMCIgTWljcm9zb2Z0UGhvdG9fMV86UmF0aW5nPSI2MyI+DQoJCQk8dGlmZjpCaXRzUGVyU2FtcGxlPg0KCQkJCTxyZGY6U2VxPg0KCQkJCQk8cmRmOmxpPjg8L3JkZjpsaT4NCgkJCQkJPHJkZjpsaT44PC9yZGY6bGk+DQoJCQkJCTxyZGY6bGk+ODwvcmRmOmxpPg0KCQkJCTwvcmRmOlNlcT4NCgkJCTwvdGlmZjpCaXRzUGVyU2FtcGxlPg0KCQkJPGRjOnJpZ2h0cz4NCgkJCQk8cmRmOkFsdD4NCgkJCQkJPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij7CqSBDb3JiaXMuICBBbGwgUmlnaHRzIFJlc2VydmVkLjwvcmRmOmxpPg0KCQkJCTwvcmRmOkFsdD4NCgkJCTwvZGM6cmlnaHRzPg0KCQkJPGRjOmNyZWF0b3I+DQoJCQkJPHJkZjpTZXE+DQoJCQkJCTxyZGY6bGk+Q29yYmlzPC9yZGY6bGk+DQoJCQkJPC9yZGY6U2VxPg0KCQkJPC9kYzpjcmVhdG9yPg0KCQk8L3JkZjpEZXNjcmlwdGlvbj4NCgk8L3JkZjpSREY+DQo8L3g6eG1wbWV0YT4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0ndyc/Pv/tANxQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAANhwCAAACAAIcAlAABkNvcmJpcxwCdAAfqSBDb3JiaXMuICBBbGwgUmlnaHRzIFJlc2VydmVkLjhCSU0ECgAAAAAAAQEAOEJJTQQLAAAAAABUaHR0cDovL3Byby5jb3JiaXMuY29tL3NlYXJjaC9zZWFyY2hyZXN1bHRzLmFzcD90eHQ9NDItMTcxNjcyMjImb3BlbkltYWdlPTQyLTE3MTY3MjIyOEJJTQQlAAAAAAAQV/57ZoSx9Y3BNcgMHi8Wev/bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAB0AGAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AL3xWEnw+/Z4vre33LJp9pHEDEOQ25EdxznlmdyM85Nef/AP4Rhre31bUJmvms2EhmYlYzJy2yJT0UHBLt8x5xtDFTW/ad+L95pPwgul1BQG1C3ECyR97hXDNkfw5CqwHQjIHQ16L8P93g74W6DpMrL9uWGMXG05AmkwXHXopbH0X3r+EW6+HwPOrc1Sbs1u1ZbPsr/jY/1Tpxq4fCunf3pSd7drau/qmvmd74WvbGaLy55GkfLiSRGJZXVirDIbGMrjkZyO1FfP3wV8eX1zquvWt55nnWuqzS7WGF8mZi6gc84YyLx0GOnYrmxmLxWCrOinpo16NI4MRw/U578zKv7V9naar+zzdXlmq3Een3drI53D5MyKA35Ern0dvU1N+zfH4s+J0Fnra2M0mkwFmW4fCrPJjaQi53MBz82MZyM8HH29pH/Bu3JYfCvxJ4Zm+M0l1HrzxmOdvCuPsgR9wAX7Yd3p1Fe/eA/+CUVv4D8HaZo9j40WO10+BIV/4kuNwC7R/wAt+K/Uanh/m9DB/VlSU3GTafNFaNLu97nwGM8dOFqFGVPC1+dt7unUWltd4rqfk34p+H+qfDbx3DqF1D9g1C4inMsXmLL9st/Nchl2Mf30YAYjq6bxgMo3lfoR8Yf+CE2qfE/4grrX/C5v7P8AI8hbO3Xwp5i2yx5LDP2wbi8jMxOBgYXnGaK6/wDiHuZ1YRlWopuy+1H/AD6Hp4Dxy4QdFPE4v3u3s6un/kj/ADP/2Q=="

const extraSmallImageBytes = [ 137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 5, 0, 0, 0, 6, 8, 6, 0, 0, 0, 11, 251, 84, 75, 0, 0, 0, 1, 115, 82, 71, 66, 0, 174, 206, 28, 233, 0, 0, 0, 137, 73, 68, 65, 84, 24, 87, 1, 126, 0, 129, 255, 1, 255, 106, 48, 255, 213, 212, 208, 0, 0, 254, 0, 0, 43, 47, 29, 0, 0, 14, 18, 0, 1, 255, 113, 56, 255, 219, 204, 200, 0, 37, 43, 31, 0, 249, 245, 242, 0, 1, 8, 13, 0, 1, 251, 79, 26, 255, 217, 218, 230, 0, 43, 68, 39, 0, 220, 198, 217, 0, 36, 40, 26, 0, 1, 255, 85, 39, 255, 198, 199, 217, 0, 48, 52, 16, 0, 240, 241, 240, 0, 250, 247, 1, 0, 1, 249, 94, 58, 255, 183, 187, 198, 0, 37, 45, 16, 0, 37, 36, 36, 0, 217, 208, 221, 0, 1, 224, 77, 47, 255, 11, 16, 9, 0, 20, 66, 54, 0, 0, 235, 236, 0, 226, 197, 211, 0, 66, 133, 49, 43, 23, 66, 67, 118, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130 ]

//  createObjectsForFileDummyTests('#extra-small').then(async({imageFromDom})=>{
//     const extraSmallBytes =await  converter(imageFromDom).toUint8Array()
//     const imageFromUint8 = await converter(extraSmallBytes).toImage()
//     document.body.appendChild(imageFromUint8)
//     // debugger;
//  })


/**
 * 
 * @param {string} imageQuerySelector 
 * @returns {Promise<{imageFromDom:HTMLImageElement,blob:Blob,file:File}>}
 */
async function createObjectsForFileDummyTests(imageQuerySelector) {
    const imageFromDom = document.querySelector(imageQuerySelector)//Take the original hidden image from the DOM.

    const canvas = imageToCanvas(imageFromDom, { width: imageFromDom.width, height: imageFromDom.height })

    const blob = await new Promise((res) => canvas.toBlob(res));//Create a Blob from the canvas.

    const file = new File([blob], 'Koala.jpg')//Create a file object, passing the Blob as the binary data.

    return {
        imageFromDom,
        blob,
        file
    }
}




