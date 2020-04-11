const vdom = require('./vDom')
const engine = require('./engine')

const babelConfig = {
  presets: [
    ['@babel/preset-react', { pragma: 'Proact.h', pragmaFrag: 'Proact.f' }],
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
}

const defaultOptions = {
  views: 'views',
  dev: true,
  useDynamicRoutes: false,
}

function initialize(app, userOptions) {
  const options = { ...defaultOptions, ...userOptions, babelConfig }
  const viewEngine = engine(options)
  app.engine('jsx', viewEngine)
  app.set('views', options.views)
  app.set('view engine', 'jsx')
}

module.exports = {
  initialize,
  h: vdom.createElement,
  f: vdom.createFragment,
}
