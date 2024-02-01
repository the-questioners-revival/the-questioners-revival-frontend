import { useEffect, useState } from 'react'

// type ValueType = {
//   data: any
//   status: any
// }

export default function useAbstractProvider(fetchFunction, params = null, autoFetch = true) {
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState({ data: null, status: {} })
  const [error, setError] = useState(null)

  async function fetch(fetchParams) {
    setLoading(true)

    const { res, err } = await fetchFunction(fetchParams)

    setValue(res || { data: null, status: {} })
    setError(err ? err.response : null)
    setLoading(false)
  }

  // const memoizedFetch = (newParams) => useCallback(() => fetch(newParams), [])

  useEffect(() => {
    if (autoFetch) {
      fetch(params)
    }
  }, [])

  const refetch = (refetchParams = null) => {
    fetch(refetchParams)
  }

  // if (error) {
  //   return { data: null, status: value?.error?.response?.status, refetch, loading }
  // }
  return {
    data: error ? null : value.data,
    status: error ? error.status : value.status,
    refetch,
    loading,
  }
}
