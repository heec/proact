export function toList(obj) {
  return Object.keys(obj).map((k) => ({ key: k, ...obj[k] }))
}
