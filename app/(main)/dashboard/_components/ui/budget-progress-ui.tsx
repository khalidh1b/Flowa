"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Check, Pencil, X } from 'lucide-react';
import React from 'react';

interface Budget {
  amount: number;
  currency?: string;
};

interface BudgetProgressUIProps {
  initialBudget: Budget;
  currentExpenses: number;
  currency: string;
  isEditing: boolean;
  newBudget: string;
  isLoading: boolean;
  percentUsed: number;
  onBudgetUpdate: () => void;
  onCancel: () => void;
  onStartEditing: () => void;
  onBudgetChange: (value: string) => void;
}

export const BudgetProgressUI: React.FC<BudgetProgressUIProps> = ({
  initialBudget,
  currentExpenses,
  currency,
  isEditing,
  newBudget,
  isLoading,
  percentUsed,
  onBudgetUpdate,
  onCancel,
  onStartEditing,
  onBudgetChange,
}) => {
  const getProgressColor = (percent: number) => {
    if (percent >= 90) return "bg-red-500";
    if (percent >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className='flex-1'>
          <CardTitle> Monthly Budget (Default Account) </CardTitle>
          <div className='flex items-center gap-2 mt-1'>
            {isEditing ? (
              <div className='flex items-center gap-2'>
                <Input 
                  type="number" 
                  value={newBudget} 
                  onChange={(e) => onBudgetChange(e.target.value)} 
                  className="w-32" 
                  placeholder="Enter amount"
                  autoFocus 
                  disabled={!!isLoading}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onBudgetUpdate}
                  disabled={!!isLoading}
                >
                  <Check className='h-4 w-4 text-green-500'/>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onCancel}
                  disabled={!!isLoading}
                >
                  <X className='h-4 w-4 text-red-500'/>
                </Button>
              </div>
            ) : (
              <>
                <CardDescription>
                  {initialBudget 
                    ? `${currency} ${currentExpenses.toFixed(2)} of ${currency} ${initialBudget.amount.toFixed(2)} spent`
                    : "No budget set"
                  }
                </CardDescription>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onStartEditing} 
                  className="h-6 w-6"
                >
                  <Pencil className='h-3 w-3' />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {initialBudget && (
          <div className='space-y-2'>
            <Progress 
              value={percentUsed} 
              extraStyles={getProgressColor(percentUsed)}
            />
            <p className='text-sm text-muted-foreground text-right'>
              {percentUsed.toFixed(1)}% used
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
