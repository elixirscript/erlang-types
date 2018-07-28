export class BitString {
  value: number[]
  length: number
  bit_size: number
  byte_size: number

  constructor(...args: any[]) {
    this.value = Object.freeze(this.process(args)) as number[]
    this.length = this.value.length
    this.bit_size = this.length * 8
    this.byte_size = this.length
  }

  get(index: number): any {
    return this.value[index]
  }

  count(): number {
    return this.value.length
  }

  slice(start: number, end: number | undefined = undefined): BitString {
    let s = this.value.slice(start, end)
    let ms = s.map(elem => BitString.integer(elem))
    return new BitString(...ms)
  }

  [Symbol.iterator]() {
    return this.value[Symbol.iterator]()
  }

  toString(): string {
    var i,
      s = ''
    for (i = 0; i < this.count(); i++) {
      if (s !== '') {
        s += ', '
      }
      s += this.get(i).toString()
    }

    return '<<' + s + '>>'
  }

  private process(bitStringParts: any[]): number[] {
    let processed_values: number[] = []

    var i
    for (i = 0; i < bitStringParts.length; i++) {
      const functionName: string = 'process_' + bitStringParts[i].type

      let processed_value = (<any>this)[functionName](bitStringParts[i])

      for (let attr of bitStringParts[i].attributes) {
        const functionName = 'process_' + attr

        processed_value = (<any>this)[functionName](processed_value)
      }

      processed_values = processed_values.concat(processed_value)
    }

    return processed_values
  }

  private process_integer(value: any): number {
    return value.value
  }

  private process_float(value: any): number[] {
    if (value.size === 64) {
      return BitString.float64ToBytes(value.value)
    } else if (value.size === 32) {
      return BitString.float32ToBytes(value.value)
    }

    throw new Error('Invalid size for float')
  }

  private process_bitstring(value: any): number[] {
    return value.value.value
  }

  private process_binary(value: any): number[] {
    return BitString.toUTF8Array(value.value)
  }

  private process_utf8(value: any): number[] {
    return BitString.toUTF8Array(value.value)
  }

  private process_utf16(value: any): number[] {
    return BitString.toUTF16Array(value.value)
  }

  private process_utf32(value: any): number[] {
    return BitString.toUTF32Array(value.value)
  }

  private process_signed(value: any): number {
    return new Uint8Array([value])[0]
  }

  private process_unsigned(value: any): number[] {
    return value
  }

  private process_native(value: any): number[] {
    return value
  }

  private process_big(value: any): number[] {
    return value
  }

  private process_little(value: any): number[] {
    return value.reverse()
  }

  private process_size(value: any): number[] {
    return value
  }

  private process_unit(value: any): number[] {
    return value
  }

  static integer(value: any): {value: any; attributes: any[]} {
    return BitString.wrap(value, {type: 'integer', unit: 1, size: 8})
  }

  static float(value: any): {value: any; attributes: any[]} {
    return BitString.wrap(value, {type: 'float', unit: 1, size: 64})
  }

  static bitstring(value: any): {value: any; attributes: any[]} {
    return BitString.wrap(value, {
      type: 'bitstring',
      unit: 1,
      size: value.bit_size,
    })
  }

  static bits(value: any): {value: any; attributes: any[]} {
    return BitString.bitstring(value)
  }

  static binary(value: any): {value: any; attributes: any[]} {
    return BitString.wrap(value, {
      type: 'binary',
      unit: 8,
      size: value.length,
    })
  }

  static bytes(value: any): {value: any; attributes: any[]} {
    return BitString.binary(value)
  }

  static utf8(value: any): {value: any; attributes: any[]} {
    return BitString.wrap(value, {type: 'utf8', unit: 1, size: value.length})
  }

  static utf16(value: any): {value: any; attributes: any[]} {
    return BitString.wrap(value, {
      type: 'utf16',
      unit: 1,
      size: value.length * 2,
    })
  }

  static utf32(value: any): {value: any; attributes: any[]} {
    return BitString.wrap(value, {
      type: 'utf32',
      unit: 1,
      size: value.length * 4,
    })
  }

  static signed(value: any): {value: any; attributes: any[]} {
    return BitString.wrap(value, {}, 'signed')
  }

  static unsigned(value: any): {value: any; attributes: any[]} {
    return BitString.wrap(value, {}, 'unsigned')
  }

  static native(value: any): {value: any; attributes: any[]} {
    return BitString.wrap(value, {}, 'native')
  }

  static big(value: any): {value: any; attributes: any[]} {
    return BitString.wrap(value, {}, 'big')
  }

  static little(value: any): {value: any; attributes: any[]} {
    return BitString.wrap(value, {}, 'little')
  }

  static size(value: any, count: number): {value: any; attributes: any[]} {
    return BitString.wrap(value, {size: count})
  }

  static unit(value: any, count: number): {value: any; attributes: any[]} {
    return BitString.wrap(value, {unit: count})
  }

  static wrap(
    value: {value: any; attributes: any[]},
    opt: Object,
    new_attribute: any = null
  ): {value: any; attributes: any[]} {
    let the_value = value

    if (!(value instanceof Object)) {
      the_value = {value: value, attributes: []}
    }

    the_value = Object.assign(the_value, opt)

    if (new_attribute) {
      the_value.attributes.push(new_attribute)
    }

    return the_value
  }

  static toUTF8Array(str: string): number[] {
    var utf8 = []
    for (var i = 0; i < str.length; i++) {
      var charcode = str.charCodeAt(i)
      if (charcode < 0x80) {
        utf8.push(charcode)
      } else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f))
      } else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(
          0xe0 | (charcode >> 12),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f)
        )
      } else {
        // surrogate pair
        i++
        // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves
        charcode =
          0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff))
        utf8.push(
          0xf0 | (charcode >> 18),
          0x80 | ((charcode >> 12) & 0x3f),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f)
        )
      }
    }
    return utf8
  }

  static toUTF16Array(str: string): number[] {
    var utf16: number[] = []
    for (var i = 0; i < str.length; i++) {
      var codePoint = str.codePointAt(i)

      if (codePoint) {
        if (codePoint <= 255) {
          utf16.push(0)
          utf16.push(codePoint)
        } else {
          utf16.push((codePoint >> 8) & 0xff)
          utf16.push(codePoint & 0xff)
        }
      }
    }
    return utf16
  }

  static toUTF32Array(str: string): number[] {
    var utf32: number[] = []
    for (var i = 0; i < str.length; i++) {
      var codePoint = str.codePointAt(i)

      if (codePoint) {
        if (codePoint <= 255) {
          utf32.push(0)
          utf32.push(0)
          utf32.push(0)
          utf32.push(codePoint)
        } else {
          utf32.push(0)
          utf32.push(0)
          utf32.push((codePoint >> 8) & 0xff)
          utf32.push(codePoint & 0xff)
        }
      }
    }
    return utf32
  }

  //http://stackoverflow.com/questions/2003493/javascript-float-from-to-bits
  static float32ToBytes(f: number): number[] {
    var bytes = []

    var buf = new ArrayBuffer(4)
    new Float32Array(buf)[0] = f

    let intVersion = new Uint32Array(buf)[0]

    bytes.push((intVersion >> 24) & 0xff)
    bytes.push((intVersion >> 16) & 0xff)
    bytes.push((intVersion >> 8) & 0xff)
    bytes.push(intVersion & 0xff)

    return bytes
  }

  static float64ToBytes(f: number): number[] {
    var bytes = []

    var buf = new ArrayBuffer(8)
    new Float64Array(buf)[0] = f

    var intVersion1 = new Uint32Array(buf)[0]
    var intVersion2 = new Uint32Array(buf)[1]

    bytes.push((intVersion2 >> 24) & 0xff)
    bytes.push((intVersion2 >> 16) & 0xff)
    bytes.push((intVersion2 >> 8) & 0xff)
    bytes.push(intVersion2 & 0xff)

    bytes.push((intVersion1 >> 24) & 0xff)
    bytes.push((intVersion1 >> 16) & 0xff)
    bytes.push((intVersion1 >> 8) & 0xff)
    bytes.push(intVersion1 & 0xff)

    return bytes
  }
}
