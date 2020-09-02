import { initFetch } from '../initFetch'
import { FetchError } from '../FetchError'

export const buildAllPages = async () => {
  try {
    const response = await window.fetch(
      `/admin/api/build-all`,
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
