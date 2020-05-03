const { createElement } = require('../nodeTree/createElement')

function UnsafeHtml(props) {
  return createElement('unsavehtml', props)
}

module.exports = { UnsafeHtml }
