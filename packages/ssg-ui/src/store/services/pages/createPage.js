import { initFetch } from '../initFetch'
import { FetchError } from '../FetchError'

export const createPage = async (collection, page) => {
  try {
    const response = await window.fetch(
      `/admin/api/pages/${collection}`,
      initFetch('POST', page)
    )
    if (response.status === 200) {
      const data = await response.json()
      return data
    }
    throw new FetchError(response)
  } catch (error) {
    throw new FetchError(error.response, error)
  }
}
