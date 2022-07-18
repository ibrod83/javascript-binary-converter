javascript-binary-converter is a simple utility to convert various binary data objects in Javascript, like Blob, File, TypedArray and others. Works both in the browser and in Node.js(with limitations)

If you encounter any bugs or have a question, please don't hesitate to open an issue.

## Installation

```sh
$ npm install javascript-binary-converter
```

## Usage in the browser, or under any ES6 modules system:

```javascript
import converter from "javascript-binary-converter";
```

## Usage in Node.js:

```javascript
const converter = require("javascript-binary-converter").default;
```

## Usage in the browser, in a classical HTML page:

```html
<script type="module">
  import converter from "/node_modules/javascript-binary-converter/build/esm/index.js";
  ...
</script>
```

# Table of Contents

- [Concept](#concept)
- [Examples](#examples)
  - [File to Image](#file-to-image)
  - [Blob to Image ](#blob-to-image)
  - [Image to Uint8Array](#image-to-uint8array)
  - [Uint8Array to Image](#uint8array-to-image)

## Concept

converter is a function that accepts any of the convertable objects, recognize the type, and expose the conversion methods that exist for this specific object.
Just pass the object you want to convert, and call the appropriate method.

## Examples

#### File to image

Useful when there is a need to present an image preview, when a user selects an image file

```javascript
import converter from "javascript-binary-converter";

document
  .querySelector("#some-file-input")
  .addEventListener("change", async (event) => {
    const target = event.target;
    const files = target.files; //An array of File objects

    //Image/HtmlImageElement object
    const image = await converter(files[0]).toImage({ maxSize: 200 }); //maxSize will scale down the image, while maintaining its proportions.
    //Omit if the original size is prefered.

    document.queryselector("#image-preview").appendChild(image);
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

#### Uint8Array to Image

Suppose you have an array of decimals, each representing a byte, in an unsigned 8 bit integer. You can convert those bytes into an html image(assuming the bytes represent an actual image):

```javascript
const dummyImageBytes = [//These bytes represent a tiny image
  137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 5, 0,
  0, 0, 6, 8, 6, 0, 0, 0, 11, 251, 84, 75, 0, 0, 0, 1, 115, 82, 71, 66, 0, 174,
  206, 28, 233, 0, 0, 0, 137, 73, 68, 65, 84, 24, 87, 1, 126, 0, 129, 255, 1,
  255, 106, 48, 255, 213, 212, 208, 0, 0, 254, 0, 0, 43, 47, 29, 0, 0, 14, 18,
  0, 1, 255, 113, 56, 255, 219, 204, 200, 0, 37, 43, 31, 0, 249, 245, 242, 0, 1,
  8, 13, 0, 1, 251, 79, 26, 255, 217, 218, 230, 0, 43, 68, 39, 0, 220, 198, 217,
  0, 36, 40, 26, 0, 1, 255, 85, 39, 255, 198, 199, 217, 0, 48, 52, 16, 0, 240,
  241, 240, 0, 250, 247, 1, 0, 1, 249, 94, 58, 255, 183, 187, 198, 0, 37, 45,
  16, 0, 37, 36, 36, 0, 217, 208, 221, 0, 1, 224, 77, 47, 255, 11, 16, 9, 0, 20,
  66, 54, 0, 0, 235, 236, 0, 226, 197, 211, 0, 66, 133, 49, 43, 23, 66, 67, 118,
  0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130,
];

const uint8 = new Uint8Array(dummyImageBytes);

const image = await converter(uint8).toImage();

document.body.appendChild(image)//You can see the image in the DOM
```
