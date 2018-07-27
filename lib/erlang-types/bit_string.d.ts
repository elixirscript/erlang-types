declare class BitString {
    value: number[];
    length: number;
    bit_size: number;
    byte_size: number;
    [x: string]: any;
    constructor(...args: any[]);
    get(index: number): any;
    count(): number;
    slice(start: number, end?: number | undefined): BitString;
    [Symbol.iterator](): IterableIterator<number>;
    toString(): string;
    process(bitStringParts: any[]): number[];
    process_integer(value: any): number;
    process_float(value: any): number[];
    process_bitstring(value: any): number[];
    process_binary(value: any): number[];
    process_utf8(value: any): number[];
    process_utf16(value: any): number[];
    process_utf32(value: any): number[];
    process_signed(value: any): number;
    process_unsigned(value: any): number[];
    process_native(value: any): number[];
    process_big(value: any): number[];
    process_little(value: any): number[];
    process_size(value: any): number[];
    process_unit(value: any): number[];
    static integer(value: any): {
        value: any;
        attributes: any[];
    };
    static float(value: any): {
        value: any;
        attributes: any[];
    };
    static bitstring(value: any): {
        value: any;
        attributes: any[];
    };
    static bits(value: any): {
        value: any;
        attributes: any[];
    };
    static binary(value: any): {
        value: any;
        attributes: any[];
    };
    static bytes(value: any): {
        value: any;
        attributes: any[];
    };
    static utf8(value: any): {
        value: any;
        attributes: any[];
    };
    static utf16(value: any): {
        value: any;
        attributes: any[];
    };
    static utf32(value: any): {
        value: any;
        attributes: any[];
    };
    static signed(value: any): {
        value: any;
        attributes: any[];
    };
    static unsigned(value: any): {
        value: any;
        attributes: any[];
    };
    static native(value: any): {
        value: any;
        attributes: any[];
    };
    static big(value: any): {
        value: any;
        attributes: any[];
    };
    static little(value: any): {
        value: any;
        attributes: any[];
    };
    static size(value: any, count: number): {
        value: any;
        attributes: any[];
    };
    static unit(value: any, count: number): {
        value: any;
        attributes: any[];
    };
    static wrap(value: {
        value: any;
        attributes: any[];
    }, opt: Object, new_attribute?: any): {
        value: any;
        attributes: any[];
    };
    static toUTF8Array(str: string): number[];
    static toUTF16Array(str: string): number[];
    static toUTF32Array(str: string): number[];
    static float32ToBytes(f: number): number[];
    static float64ToBytes(f: number): number[];
}
export default BitString;
