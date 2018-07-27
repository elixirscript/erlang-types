import 'mocha'
import ErlangTypes from '../src/index'
import chai from 'chai'
const expect = chai.expect

const BitString = ErlangTypes.BitString

describe('BitString', function() {
  describe('creation', function() {
    it('create properly', function() {
      let bs = new BitString(BitString.integer(1))
      expect(bs.value).to.eql([1])

      bs = new BitString(BitString.binary('foo'))
      expect(bs.value).to.eql([102, 111, 111])

      bs = new BitString(BitString.integer(0), BitString.binary('foo'))
      expect(bs.value).to.eql([0, 102, 111, 111])

      bs = new BitString(BitString.float(3.14))
      expect(bs.value).to.eql([64, 9, 30, 184, 81, 235, 133, 31])

      bs = new BitString(BitString.signed(BitString.integer(-100)))
      expect(bs.value).to.eql([156])
    })
  })

  describe('UTF conversions', function() {
    it('toUTF8Array', function() {
      let bs = BitString.toUTF8Array('fo≈')
      expect(bs).to.eql([102, 111, 226, 137, 136])
    })

    it('toUTF16Array', function() {
      let bs = BitString.toUTF16Array('fo≈')
      expect(bs).to.eql([0, 102, 0, 111, 34, 72])
    })

    it('toUTF32Array', function() {
      let bs = BitString.toUTF32Array('fo≈')
      expect(bs).to.eql([0, 0, 0, 102, 0, 0, 0, 111, 0, 0, 34, 72])
    })
  })

  describe('Float conversions', function() {
    it('float32ToBytes', function() {
      let bs = BitString.float32ToBytes(3.14)
      expect(bs).to.eql([64, 72, 245, 195])
    })

    it('float64ToBytes', function() {
      let bs = BitString.float64ToBytes(3.14)
      expect(bs).to.eql([64, 9, 30, 184, 81, 235, 133, 31])
    })
  })
})
