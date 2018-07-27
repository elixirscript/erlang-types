class Tuple {
  values: any[]
  length: number

  constructor(...args: any[]) {
    this.values = Object.freeze(args) as any[]
    this.length = this.values.length
  }

  get(index: number): any {
    return this.values[index]
  }

  count(): number {
    return this.values.length
  }

  [Symbol.iterator]() {
    return this.values[Symbol.iterator]()
  }

  toString(): string {
    let i,
      s = ''
    for (i = 0; i < this.values.length; i++) {
      if (s !== '') {
        s += ', '
      }

      const stringToAppend = this.values[i] ? this.values[i].toString() : ''

      s += stringToAppend
    }

    return '{' + s + '}'
  }

  put_elem(index: number, elem: any): Tuple {
    if (index === this.length) {
      let new_values = this.values.concat([elem])
      return new Tuple(...new_values)
    }

    let new_values = this.values.concat([])
    new_values.splice(index, 0, elem)
    return new Tuple(...new_values)
  }

  remove_elem(index: number): Tuple {
    let new_values = this.values.concat([])
    new_values.splice(index, 1)
    return new Tuple(...new_values)
  }
}

export default Tuple
