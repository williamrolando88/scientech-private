import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';

function useQueryOnMount<T>(fn: Function): [T, boolean] {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const queryData = useCallback(async () => {
    try {
      const response = await fn();

      if (response) {
        setData(response);
        setLoading(false);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [enqueueSnackbar, fn]);

  useEffectOnce(() => {
    queryData();
  });

  return [data, loading];
}

export default useQueryOnMount;
