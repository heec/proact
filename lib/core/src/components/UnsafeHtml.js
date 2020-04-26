const { createElement } = require('../createElement')

function UnsafeHtml(props) {
  return createElement('unsavehtml', props)
}

module.exports = { UnsafeHtml }
