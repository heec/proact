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

renderer
  .renderToString('HelloWorld', context, {
    docType: 'html',
  })
  .then(function (html) {
    console.log(html)
  })
