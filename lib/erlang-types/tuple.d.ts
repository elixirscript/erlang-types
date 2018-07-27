declare class Tuple {
    values: any[];
    length: number;
    constructor(...args: any[]);
    get(index: number): any;
    count(): number;
    [Symbol.iterator](): IterableIterator<any>;
    toString(): string;
    put_elem(index: number, elem: any): Tuple;
    remove_elem(index: number): Tuple;
}
export default Tuple;
