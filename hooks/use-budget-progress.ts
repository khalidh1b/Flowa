"use client";

import { updateBudget } from '@/app/actions/budget';
import useFetch from '@/hooks/use-fetch';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

interface Budget {
  amount: number;
  currency?: string;
}

interface UpdateResult {
  success: boolean;
}

export const useBudgetProgress = (initialBudget: Budget, currentExpenses: number) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount.toString() || ""
  );

  const { loading: isLoading, fn: updateBudgetFn, data: updateResult, error } = useFetch(updateBudget);

  // memoized percentage calculation for efficiency
  const percentUsed = useMemo(() => {
    if (!initialBudget?.amount || initialBudget.amount <= 0) return 0;
    return Math.min((currentExpenses / initialBudget.amount) * 100, 100);
  }, [currentExpenses, initialBudget?.amount]);

  // handle budget update with validation
  const handleBudgetUpdate = useCallback(async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("please enter a valid amount");
      return;
    }
    
    await updateBudgetFn(amount);
  }, [newBudget, updateBudgetFn]);

  // cancel editing and reset form
  const handleCancel = useCallback(() => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  }, [initialBudget?.amount]);

  // start editing mode
  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  // handle budget input change
  const handleBudgetChange = useCallback((value: string) => {
    setNewBudget(value);
  }, []);

  // handle successful update
  useEffect(() => {
    const result = updateResult as UpdateResult | undefined;
    if (result?.success) {
      setIsEditing(false);
      toast.success("budget updated successfully");
    }
  }, [updateResult]);

  useEffect(() => {
    if (error) {
      const err = error as Error;
      toast.error(err.message || "failed to update budget");
    }
  }, [error]);

  return {
    isEditing,
    newBudget,
    isLoading,
    percentUsed,
    handleBudgetUpdate,
    handleCancel,
    startEditing,
    handleBudgetChange,
  };
};