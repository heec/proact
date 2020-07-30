import { initFetch } from '../initFetch'
import { FetchError } from '../FetchError'

export const deletePage = async (collection, filename) => {
  try {
    const response = await window.fetch(
      `/admin/api/pages/${collection}/${filename}`,
      initFetch('DELETE')
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
