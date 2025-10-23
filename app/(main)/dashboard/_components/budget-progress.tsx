"use client";

import React from 'react';
import { useBudgetProgress } from '@/hooks/use-budget-progress';
import { BudgetProgressUI } from './ui/budget-progress-ui';

interface Budget {
  amount: number;
  currency?: string;
};

interface BudgetProgressProps {
  initialBudget: Budget;
  currentExpenses: number;
  currency: string;
};

const BudgetProgress: React.FC<BudgetProgressProps> = ({ 
  initialBudget, 
  currentExpenses, 
  currency 
}) => {
  const {
    isEditing,
    newBudget,
    isLoading,
    percentUsed,
    handleBudgetUpdate,
    handleCancel,
    startEditing,
    handleBudgetChange,
  } = useBudgetProgress(initialBudget, currentExpenses);

  return (
    <BudgetProgressUI
      initialBudget={initialBudget}
      currentExpenses={currentExpenses}
      currency={currency}
      isEditing={isEditing}
      newBudget={newBudget}
      isLoading={isLoading}
      percentUsed={percentUsed}
      onBudgetUpdate={handleBudgetUpdate}
      onCancel={handleCancel}
      onStartEditing={startEditing}
      onBudgetChange={handleBudgetChange}
    />
  );
};

export default BudgetProgress;
