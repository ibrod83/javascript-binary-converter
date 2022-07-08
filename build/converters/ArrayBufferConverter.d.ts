export default class ArrayBufferConverter {
    private original;
    constructor(original: ArrayBuffer);
    toImage(): Promise<HTMLImageElement>;
}
