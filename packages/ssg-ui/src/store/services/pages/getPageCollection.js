import { initFetch } from '../initFetch'
import { FetchError } from '../FetchError'

export const getPageCollection = async (collection) => {
  try {
    const response = await window.fetch(
      `/admin/api/pages/${collection}`,
      initFetch('GET')
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
