import { imageToCanvas } from "../../build/dev/utils/image.js";
import { appendZeros, decimalToBinary,  } from '../../build/dev/utils/binary.js';


/**
 * 
 * @param {string} imageQuerySelector 
 * @returns {Promise<{imageFromDom:HTMLImageElement,blob:Blob,file:File}>}
 */
export async function createObjectsForFileDummyTests(imageQuerySelector) {
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

export function mockExpect(expression) {

    const expected = window.chai.expect(expression)
    expected.toBe = expected.to.equal

    return expected
}

export const extraSmallImageByteDecimals = [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 5, 0, 0, 0, 6, 8, 6, 0, 0, 0, 11, 251, 84, 75, 0, 0, 0, 1, 115, 82, 71, 66, 0, 174, 206, 28, 233, 0, 0, 0, 137, 73, 68, 65, 84, 24, 87, 1, 126, 0, 129, 255, 1, 255, 106, 48, 255, 213, 212, 208, 0, 0, 254, 0, 0, 43, 47, 29, 0, 0, 14, 18, 0, 1, 255, 113, 56, 255, 219, 204, 200, 0, 37, 43, 31, 0, 249, 245, 242, 0, 1, 8, 13, 0, 1, 251, 79, 26, 255, 217, 218, 230, 0, 43, 68, 39, 0, 220, 198, 217, 0, 36, 40, 26, 0, 1, 255, 85, 39, 255, 198, 199, 217, 0, 48, 52, 16, 0, 240, 241, 240, 0, 250, 247, 1, 0, 1, 249, 94, 58, 255, 183, 187, 198, 0, 37, 45, 16, 0, 37, 36, 36, 0, 217, 208, 221, 0, 1, 224, 77, 47, 255, 11, 16, 9, 0, 20, 66, 54, 0, 0, 235, 236, 0, 226, 197, 211, 0, 66, 133, 49, 43, 23, 66, 67, 118, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130];
export const twosComplementExtraSmallImageBytes = [ -119, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 5, 0, 0, 0, 6, 8, 6, 0, 0, 0, 11, -5, 84, 75, 0, 0, 0, 1, 115, 82, 71, 66, 0, -82, -50, 28, -23, 0, 0, 0, -119, 73, 68, 65, 84, 24, 87, 1, 126, 0, -127, -1, 1, -1, 106, 48, -1, -43, -44, -48, 0, 0, -2, 0, 0, 43, 47, 29, 0, 0, 14, 18, 0, 1, -1, 113, 56, -1, -37, -52, -56, 0, 37, 43, 31, 0, -7, -11, -14, 0, 1, 8, 13, 0, 1, -5, 79, 26, -1, -39, -38, -26, 0, 43, 68, 39, 0, -36, -58, -39, 0, 36, 40, 26, 0, 1, -1, 85, 39, -1, -58, -57, -39, 0, 48, 52, 16, 0, -16, -15, -16, 0, -6, -9, 1, 0, 1, -7, 94, 58, -1, -73, -69, -58, 0, 37, 45, 16, 0, 37, 36, 36, 0, -39, -48, -35, 0, 1, -32, 77, 47, -1, 11, 16, 9, 0, 20, 66, 54, 0, 0, -21, -20, 0, -30, -59, -45, 0, 66, -123, 49, 43, 23, 66, 67, 118, 0, 0, 0, 0, 73, 69, 78, 68, -82, 66, 96, -126 ]
export const dummyImageBytes = [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 24, 0, 0, 0, 29, 8, 6, 0, 0, 0, 176, 186, 172, 75, 0, 0, 0, 1, 115, 82, 71, 66, 0, 174, 206, 28, 233, 0, 0, 7, 180, 73, 68, 65, 84, 72, 75, 37, 150, 107, 111, 92, 87, 21, 134, 159, 189, 207, 125, 238, 55, 219, 99, 123, 60, 25, 39, 78, 82, 187, 73, 83, 26, 26, 183, 106, 128, 148, 74, 64, 133, 40, 23, 193, 7, 64, 66, 72, 252, 0, 126, 64, 251, 39, 248, 15, 124, 64, 168, 240, 9, 62, 208, 66, 75, 90, 210, 162, 134, 75, 155, 210, 92, 156, 198, 151, 56, 142, 61, 246, 204, 196, 51, 115, 102, 206, 253, 108, 116, 156, 45, 45, 109, 105, 75, 75, 123, 105, 189, 239, 122, 223, 37, 118, 191, 134, 138, 12, 88, 126, 245, 50, 190, 215, 71, 35, 64, 122, 1, 154, 171, 8, 246, 92, 252, 174, 98, 58, 138, 169, 204, 20, 24, 15, 39, 88, 84, 232, 143, 93, 140, 102, 158, 197, 213, 121, 100, 67, 35, 141, 166, 132, 161, 192, 118, 10, 4, 81, 128, 229, 20, 137, 99, 3, 41, 109, 196, 189, 117, 212, 153, 11, 109, 84, 85, 67, 216, 160, 57, 6, 244, 198, 60, 185, 223, 197, 63, 72, 9, 159, 128, 72, 64, 24, 32, 4, 12, 122, 240, 220, 149, 21, 186, 225, 128, 198, 114, 131, 88, 155, 162, 164, 66, 8, 27, 203, 201, 225, 133, 30, 74, 24, 104, 90, 145, 48, 4, 113, 255, 154, 80, 43, 175, 190, 196, 164, 183, 129, 153, 55, 208, 149, 142, 240, 76, 188, 251, 46, 221, 47, 123, 132, 83, 133, 0, 198, 174, 98, 161, 173, 211, 188, 116, 158, 221, 173, 219, 148, 150, 234, 148, 230, 202, 76, 38, 99, 52, 195, 192, 52, 243, 104, 229, 50, 84, 242, 224, 122, 132, 174, 66, 106, 14, 226, 139, 107, 168, 181, 245, 139, 4, 193, 99, 172, 162, 77, 50, 77, 208, 162, 50, 238, 231, 46, 59, 183, 31, 51, 241, 20, 81, 4, 175, 92, 61, 13, 118, 66, 223, 239, 162, 242, 138, 198, 169, 89, 98, 161, 240, 167, 33, 82, 51, 200, 149, 170, 248, 158, 139, 210, 19, 156, 82, 5, 180, 18, 164, 58, 162, 255, 139, 166, 170, 205, 148, 72, 213, 49, 210, 18, 144, 10, 8, 202, 236, 254, 189, 139, 244, 45, 118, 143, 186, 92, 121, 121, 21, 153, 186, 116, 143, 247, 48, 103, 109, 236, 154, 133, 83, 203, 51, 157, 76, 9, 3, 65, 165, 58, 11, 121, 135, 196, 27, 162, 217, 10, 28, 7, 148, 3, 154, 141, 240, 127, 189, 172, 80, 33, 166, 17, 33, 244, 148, 48, 142, 49, 197, 44, 183, 222, 222, 192, 140, 29, 78, 173, 181, 8, 210, 33, 97, 48, 64, 207, 41, 106, 157, 57, 40, 219, 68, 227, 62, 169, 146, 152, 70, 149, 241, 36, 3, 214, 196, 202, 9, 66, 53, 34, 21, 10, 187, 56, 71, 26, 166, 136, 244, 205, 51, 42, 244, 38, 88, 166, 4, 34, 166, 193, 148, 156, 217, 228, 193, 159, 55, 153, 246, 20, 245, 182, 67, 170, 123, 228, 43, 26, 197, 70, 1, 125, 174, 65, 58, 117, 145, 82, 65, 44, 192, 170, 51, 25, 186, 228, 171, 5, 162, 240, 152, 88, 12, 17, 26, 216, 118, 133, 36, 149, 136, 228, 173, 142, 138, 252, 41, 86, 150, 160, 18, 34, 161, 48, 194, 60, 71, 255, 236, 51, 220, 243, 200, 213, 5, 86, 77, 67, 175, 10, 202, 237, 89, 208, 36, 132, 1, 36, 9, 161, 27, 99, 22, 23, 185, 123, 235, 14, 207, 172, 174, 224, 39, 67, 116, 123, 138, 158, 211, 81, 177, 6, 74, 67, 196, 111, 182, 149, 84, 41, 42, 152, 32, 165, 198, 116, 26, 146, 211, 103, 56, 250, 112, 7, 255, 40, 70, 90, 96, 206, 72, 170, 171, 13, 244, 102, 30, 82, 31, 188, 9, 96, 128, 39, 73, 125, 135, 47, 55, 30, 178, 184, 180, 128, 52, 2, 156, 82, 136, 31, 185, 216, 78, 153, 56, 74, 16, 234, 173, 85, 21, 14, 7, 152, 50, 1, 77, 195, 159, 4, 216, 230, 44, 15, 255, 178, 65, 58, 4, 43, 7, 84, 5, 179, 87, 90, 104, 117, 73, 226, 246, 208, 4, 196, 126, 138, 174, 138, 16, 87, 184, 254, 167, 13, 190, 114, 121, 22, 195, 78, 17, 230, 16, 97, 68, 88, 133, 50, 105, 24, 33, 122, 63, 40, 169, 122, 103, 9, 8, 152, 30, 29, 96, 154, 214, 73, 226, 254, 205, 199, 116, 183, 66, 170, 85, 200, 183, 139, 52, 174, 117, 136, 233, 163, 135, 46, 217, 4, 165, 137, 134, 8, 44, 212, 208, 225, 163, 247, 246, 88, 106, 155, 180, 151, 155, 248, 234, 0, 187, 32, 8, 226, 16, 123, 166, 129, 216, 190, 130, 58, 245, 204, 153, 19, 128, 135, 163, 1, 134, 38, 177, 84, 142, 222, 3, 159, 173, 187, 199, 39, 128, 61, 255, 205, 37, 172, 139, 69, 92, 127, 159, 2, 41, 177, 59, 65, 72, 139, 104, 44, 73, 122, 26, 255, 253, 248, 24, 219, 130, 175, 190, 114, 150, 72, 29, 144, 72, 23, 195, 209, 208, 12, 137, 112, 175, 229, 149, 208, 117, 114, 245, 42, 155, 219, 219, 204, 207, 148, 145, 137, 205, 131, 59, 199, 244, 123, 1, 74, 135, 175, 255, 236, 18, 169, 61, 32, 145, 83, 12, 47, 62, 1, 207, 31, 251, 216, 122, 133, 222, 189, 62, 195, 253, 128, 253, 125, 184, 250, 173, 139, 196, 201, 30, 169, 54, 70, 90, 49, 186, 99, 32, 226, 111, 59, 42, 82, 18, 187, 213, 225, 96, 115, 7, 225, 7, 136, 216, 102, 107, 203, 229, 137, 171, 56, 117, 30, 86, 95, 91, 35, 10, 187, 36, 105, 128, 25, 130, 76, 53, 122, 131, 49, 141, 185, 211, 28, 126, 186, 67, 255, 81, 196, 120, 4, 237, 78, 141, 153, 150, 206, 52, 58, 164, 88, 51, 72, 69, 132, 80, 63, 68, 77, 66, 48, 43, 11, 24, 149, 22, 91, 239, 223, 100, 50, 80, 12, 167, 58, 125, 55, 230, 181, 239, 55, 200, 47, 26, 144, 4, 36, 97, 136, 166, 4, 145, 151, 48, 154, 166, 212, 155, 167, 25, 223, 125, 196, 248, 208, 99, 239, 81, 132, 105, 193, 165, 151, 150, 193, 158, 18, 120, 93, 172, 188, 142, 80, 63, 65, 37, 66, 103, 28, 27, 228, 237, 25, 24, 8, 254, 125, 99, 135, 137, 15, 190, 130, 215, 127, 220, 66, 152, 35, 226, 40, 194, 176, 108, 82, 223, 39, 140, 193, 79, 76, 42, 213, 38, 222, 163, 30, 199, 251, 46, 225, 212, 198, 247, 3, 78, 159, 107, 96, 56, 62, 169, 230, 34, 205, 4, 17, 189, 33, 149, 176, 12, 98, 83, 39, 12, 53, 138, 165, 101, 62, 248, 227, 103, 196, 30, 152, 38, 92, 185, 186, 68, 42, 142, 79, 72, 96, 59, 38, 113, 146, 208, 31, 78, 168, 55, 91, 232, 78, 145, 164, 63, 228, 241, 230, 33, 137, 235, 156, 248, 69, 185, 102, 48, 219, 202, 99, 87, 20, 104, 33, 194, 251, 30, 202, 174, 150, 240, 35, 15, 187, 80, 99, 120, 16, 225, 13, 36, 55, 111, 244, 88, 168, 11, 206, 102, 21, 153, 1, 186, 145, 34, 180, 20, 215, 155, 18, 2, 141, 197, 22, 210, 41, 112, 252, 240, 49, 120, 26, 201, 212, 98, 227, 206, 1, 197, 18, 60, 251, 92, 139, 72, 100, 12, 140, 16, 193, 79, 133, 18, 66, 98, 216, 14, 96, 227, 63, 129, 112, 108, 242, 143, 191, 62, 102, 177, 38, 105, 206, 217, 152, 70, 72, 28, 199, 84, 235, 14, 35, 207, 35, 53, 160, 209, 105, 129, 229, 16, 118, 135, 28, 236, 246, 104, 159, 123, 158, 135, 183, 55, 216, 127, 232, 178, 182, 86, 195, 41, 1, 25, 200, 241, 175, 76, 37, 148, 68, 234, 54, 164, 22, 132, 22, 253, 109, 151, 91, 55, 6, 212, 243, 18, 199, 72, 41, 22, 65, 51, 159, 70, 164, 192, 40, 74, 74, 243, 53, 244, 172, 135, 158, 224, 254, 157, 61, 170, 245, 10, 141, 243, 207, 242, 191, 119, 111, 48, 62, 134, 23, 215, 155, 120, 222, 8, 49, 249, 165, 169, 114, 118, 254, 105, 102, 230, 153, 137, 197, 254, 189, 62, 247, 63, 113, 201, 3, 37, 27, 138, 101, 137, 89, 18, 140, 253, 132, 84, 66, 243, 84, 9, 229, 40, 114, 229, 18, 193, 32, 96, 103, 179, 199, 202, 217, 69, 182, 182, 247, 56, 179, 254, 13, 62, 125, 231, 58, 243, 141, 2, 181, 74, 17, 225, 254, 220, 86, 150, 158, 89, 165, 124, 90, 162, 83, 230, 240, 246, 33, 183, 63, 24, 81, 0, 202, 217, 68, 218, 9, 83, 3, 198, 49, 180, 58, 146, 217, 214, 28, 86, 61, 79, 166, 194, 238, 208, 103, 127, 111, 192, 220, 108, 9, 119, 228, 145, 198, 14, 203, 107, 207, 115, 235, 221, 15, 88, 59, 119, 10, 49, 122, 195, 82, 150, 153, 241, 60, 194, 172, 149, 201, 250, 17, 29, 68, 124, 248, 135, 135, 84, 53, 11, 226, 224, 196, 156, 162, 58, 172, 127, 247, 50, 56, 22, 72, 136, 220, 99, 148, 166, 48, 107, 21, 200, 229, 78, 156, 112, 255, 147, 207, 25, 108, 15, 233, 204, 180, 201, 235, 22, 247, 62, 251, 28, 113, 176, 46, 84, 185, 82, 36, 85, 1, 102, 209, 68, 95, 154, 129, 177, 198, 245, 223, 223, 71, 184, 156, 40, 167, 217, 128, 23, 127, 116, 25, 85, 2, 225, 216, 39, 190, 129, 46, 65, 197, 96, 102, 10, 236, 97, 27, 37, 122, 119, 119, 25, 110, 62, 33, 232, 77, 88, 91, 125, 22, 183, 123, 132, 184, 187, 128, 50, 109, 200, 34, 215, 48, 169, 94, 108, 19, 143, 99, 254, 245, 206, 54, 147, 62, 24, 6, 188, 252, 157, 11, 24, 231, 114, 80, 201, 126, 211, 33, 10, 193, 202, 238, 136, 216, 139, 32, 208, 208, 173, 57, 118, 174, 255, 135, 224, 96, 136, 30, 130, 109, 88, 44, 116, 58, 136, 59, 85, 148, 239, 131, 149, 135, 210, 188, 198, 226, 250, 10, 36, 138, 143, 222, 217, 96, 216, 135, 165, 142, 197, 133, 171, 23, 160, 101, 64, 65, 157, 84, 30, 199, 62, 186, 46, 72, 130, 16, 34, 137, 230, 91, 224, 21, 249, 240, 119, 239, 209, 42, 58, 136, 32, 38, 240, 35, 206, 159, 93, 65, 108, 207, 20, 212, 225, 145, 155, 81, 154, 70, 187, 192, 194, 75, 103, 192, 16, 124, 252, 183, 79, 57, 60, 130, 23, 94, 158, 103, 233, 210, 25, 104, 24, 96, 198, 40, 21, 227, 133, 19, 12, 59, 219, 64, 20, 201, 56, 197, 86, 21, 190, 124, 255, 14, 251, 95, 244, 57, 187, 80, 102, 216, 29, 18, 78, 160, 221, 42, 33, 222, 95, 233, 168, 238, 225, 33, 150, 109, 50, 215, 158, 225, 244, 11, 29, 82, 67, 241, 201, 205, 91, 236, 29, 28, 242, 218, 235, 215, 152, 89, 154, 3, 71, 35, 146, 49, 113, 28, 18, 36, 30, 186, 35, 208, 164, 100, 116, 56, 98, 214, 105, 242, 219, 223, 188, 77, 187, 82, 99, 185, 57, 207, 238, 230, 3, 76, 161, 97, 26, 6, 66, 61, 233, 43, 84, 54, 117, 26, 200, 24, 52, 31, 72, 51, 233, 1, 61, 99, 87, 38, 181, 38, 39, 212, 201, 142, 74, 65, 196, 144, 89, 172, 72, 179, 68, 8, 82, 144, 5, 78, 134, 36, 136, 158, 46, 6, 217, 187, 20, 252, 31, 124, 11, 169, 80, 2, 183, 161, 123, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]

export function getBytes() {
    const bytes = extraSmallImageByteDecimals.map(decimal => appendZeros(decimalToBinary(decimal)))
    return bytes
}
