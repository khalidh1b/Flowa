"use client";

import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RECURRING_INTERVALS } from '@/hooks/use-transaction-table/types';
import { format } from 'date-fns';
import { Clock, RefreshCw } from 'lucide-react';
import React from 'react';
import type { Transaction } from '@/app/lib/types';

interface RecurringBadgeProps {
    transaction: Transaction;
    className?: string;
}

export const RecurringBadge: React.FC<RecurringBadgeProps> = ({ 
    transaction, 
    className = "" 
}) => {
    if (transaction.isRecurring) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Badge 
                            variant='outline' 
                            className={`gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200 ${className}`}
                        >
                            <RefreshCw className='h-3 w-3' />
                            {transaction.recurringInterval ? RECURRING_INTERVALS[transaction.recurringInterval] : "Unknown"}
                        </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                        <div className='text-sm'>
                            <div className='font-medium'>
                                Next Date:
                            </div>
                            <div>
                                {transaction.nextRecurringDate ? format(new Date(transaction.nextRecurringDate), "PP") : "-"}
                            </div>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return (
        <Badge variant='outline' className={`gap-1 ${className}`}>
            <Clock className='h-3 w-3' />
            One-time
        </Badge>
    );
};
