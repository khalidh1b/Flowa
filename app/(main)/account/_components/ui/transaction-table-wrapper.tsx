"use client";

import { Loader } from 'lucide-react';
import React from 'react';

interface TransactionTableWrapperProps {
    children: React.ReactNode;
    isLoading?: boolean;
    loadingText?: string;
}

export const TransactionTableWrapper: React.FC<TransactionTableWrapperProps> = ({
    children,
    isLoading = false,
    loadingText = "Loading...",
}) => {
    return (
        <div className='space-y-4'>
            {isLoading && (
                <div className="flex gap-2 items-center">
                    <Loader className="animate-spin w-8 h-8"/>
                    {loadingText}
                </div>
            )}
            {children}
        </div>
    );
};
