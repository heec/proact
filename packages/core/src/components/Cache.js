const { createElement } = require('../nodeTree/createElement')

const defaultCacheOptions = {
  maxCacheSize: 1, // in MB
  maxAge: 720, // in seconds
}

const contentCache = {
  items: {},
  totalSize: 0,
  contains: function (key) {
    const item = contentCache.items[key]
    if (item) {
      // remove item if outdated
      const now = new Date().getTime()
      if (item.validUntil < now) {
        contentCache.remove(key)
      }
    }
    return contentCache.items.hasOwnProperty(key)
  },
  get: function (key) {
    contentCache.items[key].lastRead = new Date().getTime()
    contentCache.items[key].timesReaded += 1
    return contentCache.items[key].content.toString()
  },
  add: function (key, content, userOptions) {
    const now = new Date().getTime()
    const options = { ...defaultCacheOptions, ...userOptions }

    contentCache.totalSize += content.length
    contentCache.items[key] = {
      created: now,
      lastRead: now,
      validUntil: now + options.maxAge * 1000,
      timesReaded: 0,
      content: Buffer.from(content, 'utf8'),
    }
  },
  remove: function (key) {
    contentCache.totalSize -= contentCache.items[key].content.length
    delete contentCache.items[key]
  },
  getCacheInfo: function () {
    const cacheItems = contentCache.items
    const items = Object.keys(cacheItems).map((key) => ({
      key,
      created: new Date(cacheItems[key].created),
      lastRead: new Date(cacheItems[key].lastRead),
      validUntil: new Date(cacheItems[key].validUntil),
      timesReaded: cacheItems[key].timesReaded,
      size: cacheItems[key].content.length,
    }))
    return {
      items,
      totalSize: contentCache.totalSize,
    }
  },
  cleanup: function () {
    const now = new Date().getTime()
    const cacheItems = contentCache.items
    const expiredItems = Object.keys(cacheItems).filter(
      (key) => cacheItems[key].validUntil < now
    )
    expiredItems.forEach((key) => {
      delete contentCache.items[key]
    })
  },
  clearAll: function () {
    contentCache.items = {}
    contentCache.totalSize = 0
  },
}

function Cache(props) {
  const { key, maxAge, children, content } = props

  if (!key) {
    throw new Error('Proact Cache: key property is required')
  }

  if (!content) {
    throw new Error('Proact Cache: content property is required')
  }

  if (children) {
    throw new Error(
      'Proact Cache: child nodes are not allowed. use content property to render cached content'
    )
  }

  if (contentCache.contains(key)) {
    return createElement('unsavehtml', {
      html: contentCache.get(key),
      preserveWhitespaces: true,
    })
  }

  return createElement(
    'chache_add',
    {
      _key: key,
      _max_age: maxAge,
    },
    [content()]
  )
}

module.exports = { Cache, contentCache }
