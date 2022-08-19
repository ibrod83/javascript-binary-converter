export function getTwosComplementBinary(bits:string){
    const inverse = getInverseBinary(bits)
    const integer = (parseInt(inverse, 2) + 1)
    return integer.toString(2)
}



export function getInverseBinary(bits: string) {
    let inverse = '';
    for (let i = 0; i < bits.length; i++) {
        inverse += (bits[i] === '0' ? '1' : '0');
    }
    return inverse

}


export function splitBinaryStringToBytes(binaryString: string) {
    const bytes = []
    let currentBitString = ""
    for (let i = 1; i <= binaryString.length; i++) {
        currentBitString += binaryString[i - 1]
        if (i % 8 === 0 || i === binaryString.length) {
            bytes.push(currentBitString)
            currentBitString = ""
        }
    }
    return bytes
}
