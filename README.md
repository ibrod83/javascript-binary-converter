javascript-binary-converter is a simple utility to convert various binary data objects in Javascript, like Blob, File, TypedArray and others. Works both in the browser and in Node.js(with limitations). It also provides some conversion abilities of raw bytes.

If you encounter any bugs or have a question, please don't hesitate to open an issue.

> :warning: **The API is still unstable and might undergo significant changes. Do not rely on semver, until it reaches version 1.0**


## Installation

```sh
$ npm install javascript-binary-converter
```


## Usage in an ES6 modules environment:

```javascript
import converter from "javascript-binary-converter";
```

## Usage in Node.js(CommonJS):

```javascript
const converter = require("javascript-binary-converter").default;
```

## Usage in the browser, in a classical HTML page:

You will need to use the umd file. Note that auto complete wont work like this(every call to converter will result in "any" in your IDE). First import the program from the umd build:

```html
<script src="/node_modules/javascript-binary-converter/build/umd/index.js"></script>
```
This exposes the program on the window object:
```javascript
const javascriptBinaryConverter = window['javascript-binary-converter']

const {converter} = javascriptBinaryConverter;
```
# Table of Contents

- [Concept](#concept)
- [Usage in Node](#usage-in-node)
- [Examples](#examples)
  - [File to Image](#file-to-image)
  - [File to bytes](#file-to-bytes)
  - [Blob to Image ](#blob-to-image)
  - [Image to Uint8Array](#image-to-uint8array)
  - [Image to byte decimals](#image-to-byte-decimals)
  - [Uint8Array to Image](#uint8array-to-image)
  - [Converting raw bytes](#converting-raw-bytes)
    - [Byte decimals to Int16Array](#byte-decimals-to-int16array)
    - [Bytes to decimals](#bytes-to-decimals)
    - [Bytes to hex](#bytes-to-hex)
  - [Converting decimals to other notations](#converting-decimals-to-other-notations)
    - [Decimal to binary](#decimal-to-binary)
    - [Float to binary](#float-to-binary)  
    - [Decimal to hex](#decimal-to-hex)
    - [Float to hex](#float-to-hex)
    - [Decimal to bytes](#decimal-to-bytes)
   


## Concept

converter is a function that accepts any of the convertible objects, recognize the type, and expose the conversion methods that exist for this specific object.
Just pass the object you want to convert, and call the appropriate method.

## Usage in Node
Not all conversion functionality is available in Node, due to natural limitations. For instance, Image conversion is unavailable, because this object 
simply doesn't exist in Node(same goes for the File object). The program will throw an exception in these cases.
If, for some reason, you need to convert a Blob object(available in Node since version 15) to some other type, import BlobConverter directly, instead of using the generic converter function, which will show incorrect method signatures in this case(some internal limitations).

## Examples

#### File to image

Convert a File(browser object) to an Image.

converter function recognizes the type passed to it, exposing the relevant methods. In this case a File object is passed,
invoking FileConvertor behind the scenes:

```javascript
import converter from "javascript-binary-converter";


document
  .querySelector("#some-file-input")
  .addEventListener("change", async (event) => {
    const target = event.target;
    const files = target.files; //An array of File objects

    //Image/HtmlImageElement object
    const image = await converter(files[0]).toImage({ maxSize: 200 }); //maxSize will scale down the image, while maintaining its proportions.
    //Omit if the original size is preferred.

    document.querySelector("#image-preview").appendChild(image);
  });
```

&nbsp;

#### File to bytes

If you want to get raw binary data of a File:

```javascript
document
  .querySelector("#some-file-input")
  .addEventListener("change", async (event) => {
    const target = event.target;
    const files = target.files; //An array of File objects

    const bytes = await converter(files[0]).toBytes(); //Will return an array of strings, each containing 8 "bits", like:
    //[00101101,10111111,00000001...]
  });
```

&nbsp;


#### Blob to Image

```javascript
  import converter from 'javascript-binary-converter';

  (async () => {
  //Wrapping the code with an async function, just for the sake of example.

   const blob = new Blob([...])//Some blob you have.

   const image = await converter(blob).toImage({type:"image/png"})//You can optionally assert the type.


})();
```

&nbsp;

#### Image to Uint8Array

```javascript
const image = document.querySelector("#some-image");

const uint8 = await converter(image).toUnit8Array();
```

&nbsp;

#### Image to byte decimals

If you want to get raw binary data of an Image(each decimal corresponds a byte):

```javascript
const image = document.querySelector("#some-image");

const byteDecimals = await converter(image).toByteDecimals(); 
//[95,1,129...]
```

&nbsp;

#### Uint8Array to Image

Suppose you have an array of decimals, each representing a byte, in an unsigned 8 bit integer. You can convert those bytes into an html image(assuming the bytes represent an actual image):

```javascript
const dummyImageByteDecimals = [
  //These decimals(bytes) represent a tiny image
  137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 5, 0, 0,
  0, 6, 8, 6, 0, 0, 0, 11, 251, 84, 75, 0, 0, 0, 1, 115, 82, 71, 66, 0, 174, 206,
  28, 233, 0, 0, 0, 137, 73, 68, 65, 84, 24, 87, 1, 126, 0, 129, 255, 1, 255, 106,
  48, 255, 213, 212, 208, 0, 0, 254, 0, 0, 43, 47, 29, 0, 0, 14, 18, 0, 1, 255, 113,
  56, 255, 219, 204, 200, 0, 37, 43, 31, 0, 249, 245, 242, 0, 1, 8, 13, 0, 1, 251,
  79, 26, 255, 217, 218, 230, 0, 43, 68, 39, 0, 220, 198, 217, 0, 36, 40, 26, 0,
  1, 255, 85, 39, 255, 198, 199, 217, 0, 48, 52, 16, 0, 240, 241, 240, 0, 250, 247,
  1, 0, 1, 249, 94, 58, 255, 183, 187, 198, 0, 37, 45, 16, 0, 37, 36, 36, 0, 217,
  208, 221, 0, 1, 224, 77, 47, 255, 11, 16, 9, 0, 20, 66, 54, 0, 0, 235, 236, 0,
  226, 197, 211, 0, 66, 133, 49, 43, 23, 66, 67, 118, 0, 0, 0, 0, 73, 69, 78, 68,
  174, 66, 96, 130,
];

const uint8 = new Uint8Array(dummyImageByteDecimals);

const image = await converter(uint8).toImage();

document.body.appendChild(image); //You can see the image in the DOM
```

&nbsp;

#### Converting raw bytes

"raw bytes", in this regard, is either an array of "bits"(a string of zeros and ones), or of decimal numbers, representing a byte(0 to 255 if unsigned, -128 to 127 if signed). Do not pass binary digits of 1 and 0, as numbers(like 10111101). If you need this, use a string("10111101"). Please note that this functionality might still have some logical flaws, so feel free to open an issue if you suspect you found one. Also, efficiency might be a problem, with very large data. 



#### Byte decimals to Int16Array

> :warning: Important: Being that int16 uses two bytes(16 bits) to represent 1 number, the program will "group" the bytes into groups of 2.
In the following case, 4 bytes will result in 2 numbers. Note that being that Int16 is signed, any decimal you pass will result in the two's complement binary.

> :warning: About byte order: Any conversion to integers larger than 8, will rely on the system's byte order, which is usually little-endian(which might be counter intuitive).

```javascript
    const bytes = [-127,-127, -1, 2]

    const int16 = converter(bytes).toInt16Array()
    //The Int16Array will contain two elements:-32383 and 767.

```

#### Bytes to decimals

As mentioned above, you can also pass real "bytes", in the form of a string. Each string needs to be 8 character long.

```javascript
  const bytes = ['11111111', '11111111', '11110111']

  const decimals = converter(bytes).toDecimals({isSigned:true})//Can be signed or unsigned. You can also assert the integer size(Default is 8)
  //[-1,-1,-9]
 
```

#### Bytes to hex

```javascript
   const bytes = ['11010100', '11111100','10001000']

  const hexes = converter(bytes).toHex({isSigned:false})//Can be signed or unsigned. Default is false.
  //['D4','FC','88']
 
```

#### Converting decimals to other notations


#### Decimal to binary

```javascript
   const decimal = 4434

  const binary = converter(decimal).toBinary()
  //'1000101010010'
 
```

#### Float to binary

```javascript
   const binary = converter(-0.32323).toBinary()
   //'10111110101001010111111001100111'   
 
```


#### Decimal to hex

```javascript
   //In this example a bigint is passed, instead of a "normal"(32 bit) decimal 

   const hex = converter(17868022686844715136n).toHex()
   //'F7F7F7F700000080'
   
 
```

#### Float to hex

```javascript
    const hex = converter(-0.43431).toHex()
    //'BEDE5DE1'
   
 
```

#### Decimal to bytes

```javascript
   const bytes = converter(422).toBytes();

  //['00000001','10100110']Default is big endian byte order. You can pass {endianness:'LITTLE'} to reverse it.

 
```



