function createStringBuffer() {
  return {
    outBuffer: [],
    write: function (str) {
      this.outBuffer.push(str)
    },
    toString: function () {
      return this.outBuffer.join('')
    },
    end: function () {},
  }
}

module.exports = { createStringBuffer }
