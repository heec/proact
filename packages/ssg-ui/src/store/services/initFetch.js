export const initFetch = (method, data) => {
  const init = {
    method,
    credentials: 'include',
    headers: {
      pragma: 'no-cache',
      'cache-control': 'no-cache',
      Accept: 'application/json',
      credentials: 'include',
      'p4m-pf': localStorage.getItem('p4mfp'),
    },
  }
  if (data) {
    init.headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(data)
  }

  return init
}
