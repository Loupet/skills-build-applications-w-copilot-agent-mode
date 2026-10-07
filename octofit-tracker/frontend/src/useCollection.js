import { useEffect, useState } from 'react'

function parseCollection(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, total: payload.length }
  }

  if (!payload || typeof payload !== 'object') {
    throw new Error('The API returned an unsupported collection response.')
  }

  const items = payload.results ?? payload.data ?? payload.items
  const nestedItems = items?.results ?? items?.items
  const collection = Array.isArray(items) ? items : nestedItems
  if (!Array.isArray(collection)) {
    throw new Error('The API response did not contain a collection.')
  }

  return {
    items: collection,
    total:
      typeof payload.count === 'number'
        ? payload.count
        : typeof items?.count === 'number'
          ? items.count
          : collection.length,
  }
}

export function useCollection(request) {
  const [state, setState] = useState({ items: [], total: 0, loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setState({ items: [], total: 0, loading: true, error: '' })

      try {
        const response = await request(controller.signal)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`)
        }

        const collection = parseCollection(await response.json())
        setState({ ...collection, loading: false, error: '' })
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setState({
            items: [],
            total: 0,
            loading: false,
            error: error instanceof Error ? error.message : 'Unable to load this collection.',
          })
        }
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [request])

  return state
}
