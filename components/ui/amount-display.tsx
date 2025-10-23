"use client";

import React from 'react';
import type { Transaction } from '@/app/lib/types';

interface AmountDisplayProps {
    transaction: Transaction;
    className?: string;
    showCurrency?: boolean;
}

export const AmountDisplay: React.FC<AmountDisplayProps> = ({ 
    transaction, 
    className = "",
    showCurrency = true
}) => {
    const sign = transaction.type === 'EXPENSE' ? "-" : "+";
    const currency = showCurrency ? transaction.currency : "";
    const amount = transaction.amount.toFixed(2);
    
    return (
        <span 
            className={`font-medium ${className}`}
            style={{
                color: transaction.type === 'EXPENSE' ? "red" : "green"
            }}
        >
            {sign}{currency} {amount}
        </span>
    );
};
