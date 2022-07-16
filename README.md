javascript-binary-converter is a simple utility to convert various binary data objects in Javascript, like Blob, File, TypedArray and others. Works both in the browser and in Node.js(with limitations)

If you encounter any bugs or have a question, please don't hesitate to open an issue.

 
## Installation


```sh
$ npm install javascript-binary-converter
```

## Usage in the browser, or under any ES6 modules system:
```javascript
    import converter from 'javascript-binary-converter'
```

## Usage in Node.js:
```javascript
    const converter = require('javascript-binary-converter').default;
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


## Concept

converter is a function that accepts any of the convertable objects, recognize the type, and expose the conversion methods that exist for this specific object.
Just pass the object you want to convert, and call the appropriate method.


## Examples

#### File to image

Useful when there is a need to present an image preview, when a user selects an image file

```javascript
import converter from 'javascript-binary-converter';

  document.querySelector('#some-file-input').addEventListener('change', async (event) => {
            const target = event.target
            const files = target.files;//An array of File objects

            //Image/HtmlImageElement object 
            const image = await converter(files[0]).toImage({ maxSize: 200 })//maxSize will scale down the image, while maintaining its proportions.
            //Omit if the original size is prefered.

            document.queryselector('#image-preview').appendChild(image)
   })

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

   const image = document.querySelector('#some-image')

   const uint8 = await converter(image).toUnit8Array()      

```

