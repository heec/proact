const path = require('path')
const fs = require('fs')
const { babelConfig } = require('../config')
const { createVNodeTree } = require('../nodeTree/createVNodeTree')
const { renderNode } = require('./renderNodeTree')
const { createStringBuffer } = require('../utils/stringBuffer')
const {
  contextNamespace,
  setCurrentContext,
} = require('../renderContext')
const { docTypes } = require('./docTypes')

const defaultOptions = {
  docType: 'html',
  views: 'views',
  dev: false,
}

function createRenderer(options) {
  const rendererOptions = { ...defaultOptions, ...options }

  const viewsDir = path.isAbsolute(rendererOptions.views)
    ? rendererOptions.views
    : path.join(require.main.path, rendererOptions.views)

  if (!fs.lstatSync(viewsDir).isDirectory()) {
    throw new Error(
      `Proact.createRenderer: view directory '${viewsDir}' not found`
    )
  }

  require('@babel/register')({
    only: [].concat(rendererOptions.views),
    ...babelConfig,
  })

  rendererOptions._viewsDir = viewsDir

  return {
    options: rendererOptions,
    renderToString: function (filename, context, options) {
      const _self = this
      return new Promise(function (resolve, reject) {
        try {
          const stringBuffer = createStringBuffer()
          _self
            .renderToStream(filename, context, stringBuffer, options)
            .then(function () {
              const result = stringBuffer.toString()
              resolve(result)
            })
        } catch (err) {
          reject(err)
        }
      })
    },

    renderToStream: function (filename, context, stream, options) {
      const _self = this
      return new Promise(function (resolve, reject) {
        const renderOptions = { ..._self.options, ...options }
        let { docType, _viewsDir } = renderOptions

        // resolve file name
        if (!path.isAbsolute(filename)) {
          if (!filename.endsWith('.jsx')) {
            filename = filename + '.jsx'
          }
          filename = path.join(_viewsDir, filename)
        }

        // wite docDtpe
        docType = docType.trim()
        if (docType === 'xml') {
          stream.write(`${docTypes.xml}\n`)
        } else if (docType === 'svg') {
          stream.write(`${docTypes.xml}\n`)
        } else if (docType.startsWith('<') && docType.endsWith('>')) {
          stream.write(`${docType}\n`)
        }

        try {
          contextNamespace.bind(context)
          contextNamespace.run(function () {
            setCurrentContext({
              ...context,
              __proact: { ...renderOptions },
            })
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
    },
  }
}

module.exports = { createRenderer }
