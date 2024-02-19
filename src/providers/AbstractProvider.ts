import { useEffect, useState } from 'react';

type ValueType = {
  data: any;
  status: any;
};

export default function useAbstractProvider(
  fetchFunction: any,
  params: any = null,
  autoFetch: boolean = true,
) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<ValueType>({ data: null, status: {} });
  const [error, setError] = useState<any>(null);

  async function fetch(fetchParams: any) {
    setLoading(true);

    const { res, err } = await fetchFunction(fetchParams);

    setValue(res || { data: null, status: {} });
    setError(err ? err.response : null);
    setLoading(false);
  }

  // const memoizedFetch = (newParams) => useCallback(() => fetch(newParams), [])

  useEffect(() => {
    if (autoFetch) {
      fetch(params);
    }
  }, []);

  const refetch = (refetchParams = null) => {
    fetch(refetchParams);
  };

  // if (error) {
  //   return { data: null, status: value?.error?.response?.status, refetch, loading }
  // }
  return {
    data: error ? null : value.data,
    status: error ? error.status : value.status,
    refetch,
    loading,
  };
}
