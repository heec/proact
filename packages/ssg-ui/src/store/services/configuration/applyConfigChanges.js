import { initFetch } from '../initFetch'
import { FetchError } from '../FetchError'

export const applyConfigChanges = async (collection) => {
  try {
    const response = await window.fetch(
      '/admin/api/apply-config-changes',
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
