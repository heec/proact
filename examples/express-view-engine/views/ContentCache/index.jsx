import Proact, { contentCache } from '@proact/core'

import Layout from '../components/Layout'
import Section from '../components/Section'

export default function (props, context) {
  if (context.clearCache) {
    contentCache.clearAll()
  }
  const cache = contentCache.getCacheInfo()
  const now = new Date()
  return (
    <Layout>
      <Section type="content">
        <h1>Content cache</h1>
        {context.clearCache && <div>cache cleared</div>}
        <dl>
          <dt>Total Items</dt>
          <dd>{cache.items.length}</dd>
          <dt>Total Size</dt>
          <dd>{cache.totalSize}</dd>
        </dl>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Created</th>
              <th>Expiries</th>
              <th>Last read</th>
              <th>Times readed</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {cache.items.map((item) => (
              <tr>
                <td>{item.key}</td>
                <td>{item.created.toLocaleTimeString()}</td>
                <td>{item.validUntil.toLocaleTimeString()}</td>
                <td>{item.lastRead.toLocaleTimeString()}</td>
                <td>{item.timesReaded}</td>
                <td>{item.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {cache.items.length > 0 && (
          <form method="POST" action="/clear-cache">
            <button type="submit">clear cache</button>
          </form>
        )}
      </Section>
    </Layout>
  )
}
