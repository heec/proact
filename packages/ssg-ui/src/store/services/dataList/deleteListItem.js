import { initFetch } from '../initFetch'
import { FetchError } from '../FetchError'

export const deleteListItem = async (listName, id) => {
  try {
    const response = await window.fetch(
      `/admin/api/dataList/${listName}/${id}`,
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
