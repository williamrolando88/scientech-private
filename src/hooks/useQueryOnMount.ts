import { useCallback, useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';

function useQueryOnMount<T>(fn: Function): [T, boolean] {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const queryData = useCallback(async () => {
    const response = await fn();

    if (response) {
      setData(response);
      setLoading(false);
    }
  }, [fn]);

  useEffectOnce(() => {
    queryData();
  });

  return [data, loading];
}

export default useQueryOnMount;
