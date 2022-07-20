
export function decimalToBinary(decimal: number) {
    return (decimal >>> 0).toString(2);


}

export function appendZeros(binary: string) {

    let fullString = binary
    const numOfZerosMissing = 8 - binary.length
    for (let i = 0; i < numOfZerosMissing; i++) {
        fullString = "0" + fullString
    }
    return fullString
}

export function uint8ToBytes(uint8: Uint8Array) {
    const bytes: Array<string> = []
    for (let decimal of uint8) {
        bytes.push(appendZeros(decimalToBinary(decimal)))
    }
    return bytes
}