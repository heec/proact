const Proact = require('@proact/core')
const renderer = Proact.createRenderer({ views: 'templates' })

const context = {
  metaData: {
    title: 'Proact - render to string',
  },
  content: {
    title: 'Hello World',
    body: 'Lorem ipsum dolor sit amet',
  },
}

async function run() {
  const html = await renderer.renderToString('HelloWorld', context, {
    docType: 'html',
  })
  console.log(html)

  const Component = function (props, context) {
    return Proact.h('h1', {}, ['hello world'])
  }

  const html2 = await renderer.renderToString(Component, context, {
    docType: 'html',
  })
  console.log(html2)
}

run()
