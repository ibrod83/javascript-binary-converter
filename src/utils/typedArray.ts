import { TypedArray } from "../sharedTypes";

export function typedArrayToIntegers(typedArray: TypedArray) {
    const decimals = []
    for (let decimal of typedArray) {
        decimals.push(decimal)
    }
    return decimals;
}
