const { babelConfig } = require('../config')
const { createVNodeTree } = require('../nodeTree/createVNodeTree')
const { renderNode } = require('./renderNodeTree')
const { createStringBuffer } = require('../utils/stringBuffer')
const {
  contextNamespace,
  setCurrentContext,
} = require('../renderContext')

const defaultOptions = {
  dev: false,
}

class ProactRenderer {
  constructor(path, options) {
    require('@babel/register')({
      only: [].concat(path),
      ...babelConfig,
    })
    this.path = path
    this.options = { ...defaultOptions, ...options }
  }

  renderToString = async (filename, context) => {
    const stringBuffer = createStringBuffer()
    await this.renderToStream(filename, context, stringBuffer)
    const result = stringBuffer.toString()
    return result
  }

  renderToStream = (filename, context, stream) => {
    // const options = this.options
    // const basePath = this.path
    return new Promise(function (resolve, reject) {
      try {
        contextNamespace.bind(context)
        contextNamespace.run(function () {
          setCurrentContext({ ...context })
          // const start = new Date().getTime()

          let component = require(filename)
          component = component.default || component

          const nodeTree = createVNodeTree(component)

          renderNode(nodeTree, stream)
            .then(function () {
              // const duration = new Date().getTime() - start
              // if (options.dev) {
              //   stream.write(`<!-- render time: ${duration}ms -->`)
              // }
              resolve()
            })
            .catch(reject)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = ProactRenderer
