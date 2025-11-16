import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";

// enhanced fetch function type with better generic naming
type AsyncFunction<T = unknown, Args extends readonly unknown[] = readonly unknown[]> = (...args: Args) => Promise<T>;

// custom hook for managing async operations with retry and cancellation
function useFetch<T = unknown, Args extends readonly unknown[] = readonly unknown[]>(
  asyncFn: AsyncFunction<T, Args>,
  options: {
    maxRetries?: number;
    retryDelay?: number;
    showToast?: boolean;
  } = {}
) {
  const { maxRetries = 3, retryDelay = 1000, showToast = true } = options;
  
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // refs for cancellation and retry tracking
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);

  // reset all states
  const reset = useCallback(() => {
    setData(undefined);
    setError(null);
    setLoading(false);
    retryCountRef.current = 0;
    
    // cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // execute async function with retry logic
  const execute = useCallback(async (...args: Args): Promise<T | undefined> => {
    // cancel previous request if still running
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn(...args);
      setData(result);
      retryCountRef.current = 0;
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('unknown error occurred');
      setError(error);
      
      if (showToast) {
        toast.error(error.message);
      }
      
      // retry logic for network errors
      if (retryCountRef.current < maxRetries && 
          (error.message.includes('network') || error.message.includes('fetch'))) {
        retryCountRef.current++;
        await new Promise(resolve => setTimeout(resolve, retryDelay * retryCountRef.current));
        return execute(...args);
      }
      
      throw error;
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [asyncFn, maxRetries, retryDelay, showToast]);

  // manual data setter
  const setDataManual = useCallback((newData: T | ((prev: T | undefined) => T)) => {
    setData(prev => typeof newData === 'function' ? (newData as Function)(prev) : newData);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    setData: setDataManual,
    isRetrying: retryCountRef.current > 0
  };
}

export default useFetch;