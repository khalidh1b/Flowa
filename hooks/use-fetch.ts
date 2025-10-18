import { useState } from "react";
import { toast } from "sonner";

type FetchFunction<T = any, Args extends any[] = any[]> = (...args: Args) => Promise<T>;

function useFetch<T = any, Args extends any[] = any[]>(cb: FetchFunction<T, Args>) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: Args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
    } catch (err: unknown) { 
      const e = err as Error;
      setError(e);
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
}

export default useFetch;
