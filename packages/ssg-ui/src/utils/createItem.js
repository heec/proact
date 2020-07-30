import { toList } from './toList'

export function createItem(fields, locales) {
  const item = {}
  toList(fields).forEach((property) => {
    const value = {}
    if (property.localize) {
      locales.forEach((locale) => {
        value[locale] = ''
      })
    } else {
      value['*'] = ''
    }
    item[property.key] = value
  })
  return item
}
