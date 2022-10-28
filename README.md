javascript-binary-converter is a simple utility to convert various binary data objects in Javascript, like Blob, File, TypedArray and others. It also provides conversion abilities from various notations(binary,hex,decimal,"bytes") to others.

 Works both in the browser and in Node.js(with limitations).

If you encounter any bugs or have a question, please don't hesitate to open an issue.


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
const {converter} = require("javascript-binary-converter");
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
  - [Converting numbers to various notations](#converting-numbers-to-various-notations)
  - [Converting hex string to other notations](#converting-hex-string-to-other-notations)       
  - [Converting binary to other notations](#converting-binary-to-other-notations)
  - [Converting text](#converting-text)
  - [Browser tools](#browser-tools)  
    - [File to Image](#file-to-image)
    - [File to bytes](#file-to-bytes)
    - [Blob to Image ](#blob-to-image)
    - [Image to Uint8Array](#image-to-uint8array)
    - [Image to byte decimals](#image-to-byte-decimals)
    - [Uint8Array to Image](#uint8array-to-image)
  - [Converting bytes](#converting-bytes)

        
   


## Concept

converter is a function that accepts any of the convertible objects, recognizes the type of the argument, and exposes the conversion methods that exist for this specific type. Just pass the object you want to convert, and call the appropriate method.
(Some conversion functionalities require importing a class directly, instead of using this function.)

## Usage in Node
Not all conversion functionality is available in Node, due to natural limitations. For instance, Image conversion is unavailable, because this object 
simply doesn't exist in Node(same goes for the File object). The program will throw an exception in these cases.
If, for some reason, you need to convert a Blob object(available in Node since version 15) to some other type, import BlobConverter directly, instead of using the generic converter function, which will show incorrect method signatures in this case(some internal limitations).

## Examples

#### Converting numbers to various notations

If you pass a type Number, NumberConverter is invoked behind the scenes. Any JS Number notation is valid: decimal,octal(begins with 0o),hex(begins with 0x),binary(begins with 0b). More on this: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates


#### Integer to binary

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

#### Hex(Number) to binary

```javascript
   const binary = converter(0x296C167).toBinary()
   //'10100101101100000101100111'   
 
```


#### Binary(Number) float

```javascript
   const binary = 0b00111110110111100110000111010000//A Number in binary notation
   const float = converter(binary).toFloat()
   //0.4343400001525879   
 
```


#### Integer to hex string

```javascript
   //In this example a bigint is passed, instead of a "normal"(32 bit) decimal 

   const hexString = converter(17868022686844715136n).toHexString()
   //'F7F7F7F700000080'
   
 
```

#### Float to hex string

```javascript
    const hexString = converter(-0.43431).toHexString()
    //'BEDE5DE1'
   
 
```

#### Integer to decimal bytes

```javascript
   const bytes = converter(422).toDecimalBytes();

  //[1,166] Default is big endian byte order. You can pass {endianness:'LITTLE'} to reverse it.

 
```

#### Converting hex string to other notations

If you have a "hex string"(as opposed to a JS Number in hex notation), you can import the HexStringConverter directly(you cannot use the generic converter function for this)

#### Hex string to integer

```javascript

   const {HexStringConverter} = require('javascript-binary-converter');
   
   const integer = new HexStringConverter('FFF4').toInteger()
   //65524   
 
```

#### Signed Hex string to integer

you can also assert that the hex is of two's complement convention

```javascript
   const {HexStringConverter} = require('javascript-binary-converter');

   //Same hex as above, just signed.
   const integer = new HexStringConverter('FFF4').toInteger({isSigned:true})
   //-12   
 
```

#### Hex string to binary

```javascript

   const {HexStringConverter} = require('javascript-binary-converter');

   const binary = new HexStringConverter('296C167').toBinary()
   //'10100101101100000101100111' 
 
```

#### Hex string to float

```javascript

   const {HexStringConverter} = require('javascript-binary-converter');

   const float = new HexStringConverter('bede61d0').toFloat()
   //-0.43434000015 
 
```


#### Converting binary to other notations
"binary" is a string of 0's and 1's. In order to use this functionality,
You will need to import a BinaryConverter class, instead of using the generic converter function

#### Binary to integer
 ```javascript
   const {BinaryConverter} = require('javascript-binary-converter');

   const integer = new BinaryConverter('0010100101101100000101100111').toInteger()
   //result: 43434343
 
```

#### Twos complement Binary to integer
If you know your binary is of two's complement convention:
 ```javascript
   const {BinaryConverter} = require('javascript-binary-converter');

   const integer = new BinaryConverter('10111110110111100110000111010000').toInteger({isSigned:true})
   //result: -1092722224
 
```

#### Binary to float


 ```javascript
   const {BinaryConverter} = require('javascript-binary-converter');

   const float32 = new BinaryConverter('00000010100101101100000101100111').toFloat()
   //result: 2.215152....
 
```
You can also convert it to float64(double precision).

 ```javascript 
   
   const float64 = new BinaryConverter('1111111111100001110011001111001110000101111010111100100010100000').toFloat({precision:'DOUBLE'})
   //result: -1.0e308
 
```

#### Converting text

(Only UTF-8)

### Text to binary
```javascript
  const binary = converter('💜').toBinary()
  //'11110000100111111001001010011100'   
```

### Text to Uint8Array
```javascript
  const uint8 = converter(`A\nA`).toUint8Array()
  //Uint8Array items: [65,10,65]
```
#### Browser tools

The program provides some conversion abilities of binary objects that exist only in the browser. Examples:

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

"byte decimals" are normal bytes, just in decimal notation instead of binary.

```javascript
const image = document.querySelector("#some-image");

const byteIntegers = await converter(image).toByteIntegers(); 
//[95,1,129...]
```

&nbsp;

#### Uint8Array to Image

Suppose you have an array of integers, each representing a byte, in an unsigned 8 bit integer. You can convert those bytes into an html image(assuming the bytes represent an actual image):

```javascript
const dummyImageByteIntegers = [
  //These integers("bytes") represent a tiny image
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

const uint8 = new Uint8Array(dummyImageByteIntegers);

const image = await converter(uint8).toImage();

document.body.appendChild(image); //You can see the image in the DOM
```

&nbsp;

#### Converting bytes

"bytes", in this regard, are either an array of "bits"(a string of zeros and ones), or of decimal numbers, representing a byte(0 to 255 if unsigned, -128 to 127 if signed). Do not pass binary digits of 1 and 0, as numbers(like 10111101). If you need this, use a string("10111101"). Please note that this functionality might still have some logical flaws, so feel free to open an issue if you suspect you found one. Also, efficiency might be a problem, with very large data. 

A couple of examples:

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

  const decimals = converter(bytes).toIntegers({isSigned:true})//Can be signed or unsigned. You can also assert the integer size(Default is 8)
  //[-1,-1,-9]
 
```


