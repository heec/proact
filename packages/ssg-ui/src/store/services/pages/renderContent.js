import { initFetch } from '../initFetch'
import { FetchError } from '../FetchError'

export const renderContent = async (page, locale) => {
  try {
    const response = await window.fetch(
      `/admin/api/rendercontent`,
      initFetch('post', { page, locale })
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
