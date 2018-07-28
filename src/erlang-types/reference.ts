let ref_counter = -1

export class Reference {
  id: number
  ref: Symbol

  constructor() {
    ref_counter = ref_counter + 1
    this.id = ref_counter
    this.ref = Symbol()
  }

  toString(): string {
    return 'Ref#<0.0.0.' + this.id + '>'
  }
}
