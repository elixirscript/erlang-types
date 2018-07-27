import 'mocha'
import {Tuple} from '../src/index'
import chai from 'chai'
const expect = chai.expect

describe('Tuple', function() {
  describe('toString', function() {
    it('empty', function() {
      expect(new Tuple().toString()).to.eql('{}')
    })

    it('one element', function() {
      expect(new Tuple(1).toString()).to.eql('{1}')
    })

    it('multiple elements', function() {
      expect(new Tuple(1, 2, 3).toString()).to.eql('{1, 2, 3}')
    })

    it('null value', function() {
      expect(new Tuple(1, 2, 3, null).toString()).to.eql('{1, 2, 3, }')
    })
  })

  describe('count', function() {
    it('empty', function() {
      expect(new Tuple().count()).to.eql(0)
    })

    it('one element', function() {
      expect(new Tuple(1).count()).to.eql(1)
    })

    it('multiple elements', function() {
      expect(new Tuple(1, 2, 3).count()).to.eql(3)
    })
  })

  describe('get', function() {
    it('empty', function() {
      expect(new Tuple().get(0)).to.eql(undefined)
    })

    it('one element', function() {
      expect(new Tuple(1).get(0)).to.eql(1)
    })

    it('multiple elements', function() {
      expect(new Tuple(1, 2, 3).get(1)).to.eql(2)
    })
  })
})
