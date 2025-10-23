"use client";

import { updateBudget } from '@/app/actions/budget';
import useFetch from '@/hooks/use-fetch';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Budget {
  amount: number;
  currency?: string;
};

interface UpdatedBudget {
  success: boolean;
};

export const useBudgetProgress = (initialBudget: Budget, currentExpenses: number) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount.toString() || ""
  );

  const { loading: isLoading, fn: updateBudgetFn, data: updatedBudget, error } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const handleBudgetUpdate = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const handleBudgetChange = (value: string) => {
    setNewBudget(value);
  };

  useEffect(() => {
    const budget = updatedBudget as UpdatedBudget | undefined;

    if (budget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to update budget");
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
