let process_counter = -1

class PID {
  id: number

  constructor() {
    process_counter = process_counter + 1
    this.id = process_counter
  }

  toString(): string {
    return 'PID#<0.' + this.id + '.0>'
  }
}

export default PID
